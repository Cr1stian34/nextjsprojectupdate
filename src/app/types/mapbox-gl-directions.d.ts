declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { IControl } from 'mapbox-gl';
    interface MapboxDirectionsOptions {
      accessToken: string;
    }
    export default class MapboxDirections implements IControl {
      constructor(options?: Partial<MapboxDirectionsOptions>);
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(): void;
    }
  }