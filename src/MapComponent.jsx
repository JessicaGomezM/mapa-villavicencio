// src/MapComponent.js
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';

const MapComponent = () => {
  const mapRef = useRef();

  useEffect(() => {
    const villavicencio = fromLonLat([-73.63, 4.135]);

    const vectorSource = new VectorSource();

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
          style: new Style({
            image: new Icon({
                color: 'red',
              anchor: [0.5, 1],
              src: 'https://openlayers.org/en/v4.6.5/examples/data/dot.png', // URL del icono de ubicación rojo
            }),
          }),
        }),
      ],
      view: new View({
        center: villavicencio,
        zoom: 14.5,
      }),
    });

    map.on('click', (evt) => {
      const coord = toLonLat(evt.coordinate);
      console.log(`Latitud: ${coord[1]}, Longitud: ${coord[0]}`);

      // Crear un puntero en la posición clicada
      const feature = new Feature(new Point(evt.coordinate));
      vectorSource.addFeature(feature);
    });

    return () => map.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
