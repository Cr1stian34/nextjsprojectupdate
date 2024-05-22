"use strict";
"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text } from "@chakra-ui/react";
import { ICovid } from "../../interfaces/ICovid";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import { AgChartsReact } from "ag-charts-react";
import { useCovid19 } from "@/app/services/rti/covid19/useCovid19";
import { ColDef } from "ag-grid-community"; // Importa el tipo ColDef

const ChartAggrid: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: dataCovid, isLoading, isError } = useCovid19();
  const [newDataCovid, setNewDataCovid] = useState<ICovid[] | null>(null);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "60%", width: "60%" }), []);

  const columDefs = useMemo<ColDef[]>(() => {
    return [
      { headerName: "Continente", field: "continent", maxWidth: 120 },
      {
        headerName: "Pais",
        field: "country",
        chartDataType: "series",
      },
      {
        headerName: "Población",
        field: "population",
        chartDataType: "series",
      },
      {
        headerName: "Casos",
        field: "cases",
        chartDataType: "series",
        cellRenderer: (params: any) => {
          if (params.data.cases.total) {
            return <p>{params.data.cases.total}</p>;
          }
        },
      },
      {
        headerName: "Muertes",
        field: "deaths",
        chartDataType: "series",
        cellRenderer: (params: any) => {
          if (params.data.deaths.total) {
            return <p>{params.data.deaths.total}</p>;
          }
        },
      },
      {
        headerName: "Pruebas",
        field: "tests",
        chartDataType: "series",
        cellRenderer: (params: any) => {
          if (params.data.tests.total) {
            return <p>{params.data.tests.total}</p>;
          }
        },
      },
      {
        field: "day",
        chartDataType: "series",
      },

      {
        field: "time",
        chartDataType: "series",
      },
    ];
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: false,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  useEffect(() => {
    if (dataCovid) {
      const newData = dataCovid.filter(
        (covid) => covid.continent === "South-America"
      );
      setNewDataCovid(newData);
    }
  }, [dataCovid]);

  return (
    <div className="w-full bg-slate-900 h-[100vh] flex flex-col">
      <Text color={"white"} as={"cite"} className="my-5 p-5 mx-auto">
        Datos estadisticos del covid
      </Text>
      <div style={gridStyle} className="ag-theme-quartz mx-5">
        <AgGridReact
          ref={gridRef}
          rowData={newDataCovid}
          columnDefs={columDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          columnMenu={"new"}
          enableCharts={true}
        />
      </div>
    </div>
  );
};

export default ChartAggrid;
