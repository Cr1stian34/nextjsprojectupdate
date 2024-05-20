"use client";
import { AgGridReact } from "ag-grid-react";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { usePost } from "../services/rti/useCrtiListado";
import { Button, useDisclosure } from "@chakra-ui/react";
import ModalComentarios from "./ModalComentarios";
import ModalPost from "./ModalPost";
import ModalEditarPost from "./ModalEditarPost";
import AlertDialogoDelete from "./AlertDialogoDelete";
import LoaderCommon from "../common/loader/LoaderCommon";

interface propsTableRti {
  setArrayDatos: React.Dispatch<SetStateAction<IUser[] | undefined>>;
}

const TableRti: React.FC<propsTableRti> = ({ setArrayDatos }) => {
  const gridRef = useRef<AgGridReact>(null);
  const {
    isOpen: isOpenComentarios,
    onOpen: onOpenComentarios,
    onClose: onCloseComentarios,
  } = useDisclosure();
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
  } = useDisclosure();

  const {
    isOpen: isOpenEditar,
    onOpen: onOpenEditar,
    onClose: onCloseEditar,
  } = useDisclosure();

  const {
    isOpen: isOpenAlertDialog,
    onOpen: onOpenAlertDialog,
    onClose: onCloseAlertDialog,
  } = useDisclosure();
  const { data: dataPost, isLoading, isError } = usePost();
  const [postId, setPostId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [dataPosTEditar, setDataPostEditar] = useState<IUser | null>(null);
  const [dataP, setDataP] = useState<IUser[] | undefined>();
  const [postDelete, setPostDelete] = useState<number | null>(null);

  const handleComentarios = useCallback(
    (params: any) => {
      setPostId(params.data.id);
      setUserId(params.data.userId);
      onOpenComentarios();
    },
    [onOpenComentarios]
  );

  const handlePost = useCallback(
    (params: any) => {
      setPostId(params.data.id);
      onOpenPost();
    },
    [onOpenPost]
  );

  const handleEditar = useCallback(
    (params: any) => {
      setDataPostEditar(params.data);
      onOpenEditar();
    },
    [onOpenEditar]
  );

  const handleEliminarPost = useCallback(
    (params: any) => {
      setPostDelete(params.data.id);
      onOpenAlertDialog();
    },
    [onOpenAlertDialog]
  );

  const colDefs = useMemo(() => {
    return [
      { headerName: "Id del post", field: "id", width: 80 },
      { headerName: "Id del usuario", field: "userId", width: 80 },
      { headerName: "Titulo del post", field: "title", editable: true },
      {
        headerName: "Post",
        field: "body",
        editable: false,
        onCellDoubleClicked: handlePost,
        cellRenderParams: (params: any) => {},
      },
      {
        headerName: "Comentarios",
        field: "",
        onCellDoubleClicked: handleComentarios,
        cellRenderParams: (params: any) => {},
        cellRenderer: (params: any) => {
          return <p>Doble click para ver los comentarios</p>;
        },
      },
      {
        headerName: "Editar/Eliminar",
        field: "",
        cellRenderer: (params: any) => {
          return (
            <div className="flex gap-2">
              <Button
                colorScheme="blue"
                size={"sm"}
                onClick={() => handleEditar(params)}
              >
                Editar
              </Button>
              <Button
                colorScheme="red"
                size={"sm"}
                onClick={() => handleEliminarPost(params)}
              >
                Eliminar
              </Button>
            </div>
          );
        },
      },
    ];
  }, [handlePost, handleComentarios, handleEditar, handleEliminarPost]);

  useEffect(() => {
    if (dataPost) {
      setDataP(dataPost);
    }
  }, [dataPost]);

  if (isLoading) {
    return <LoaderCommon />;
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: 800 }}>
      <AgGridReact
        ref={gridRef}
        rowData={dataP}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
      />

      {dataPost && (
        <ModalComentarios
          isOpen={isOpenComentarios}
          onClose={onCloseComentarios}
          userId={userId}
          postId={postId}
        />
      )}

      {dataPost && postId && (
        <ModalPost isOpen={isOpenPost} onClose={onClosePost} postId={postId} />
      )}

      {dataPost && dataP && dataPosTEditar && (
        <ModalEditarPost
          isOpen={isOpenEditar}
          onClose={onCloseEditar}
          dataPosTEditar={dataPosTEditar}
          dataPost={dataP}
          setDataP={setDataP}
        />
      )}

      {dataPost && postDelete && dataP && (
        <AlertDialogoDelete
          isOpen={isOpenAlertDialog}
          onClose={onCloseAlertDialog}
          postId={postDelete}
          dataPost={dataP}
          setDataP={setDataP}
          setArrayDatos={setArrayDatos}
        />
      )}
    </div>
  );
};

export default TableRti;
