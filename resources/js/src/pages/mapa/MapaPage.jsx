import mapboxgl from "mapbox-gl";
import geojson from "../../helpers/geo.json";
import AnimatedPopup from "mapbox-gl-animated-popup";
import { useCallback, useEffect, useRef } from "react";

import {
    FloatButton,
    FloatAddButton,
    FloatOrgButton,
    DrawerMenu,
    DrawerOrg,
    ModalProyecto,
    ModalShowOrganizacion,
    ModalInformation,
    FloatChartBtn,
    ModalCharts,
} from "../../components";

import {
    useMarkerStore,
    useOrganizacionStore,
    useUiOrganizacion,
} from "../../hooks";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY3JpenJlYyIsImEiOiJjbGVucG5wZWIxZ3QyM3BubWt5d3F3ZWY5In0.H-k8UcdEC8w6wpGBUube5w";

/* Para los proyectos

const initialPoints = {
    longitud: -79.5,
    latitud: 0.5316,
    zoom: 8.1,

}; */

/* Para los cooperantes */
const initialPoints = {
    longitud: 0,
    latitud: 20,
    zoom: 2.2,
};

export const MapaPage = () => {
    const mapaRef = useRef(null);
    const mapa = useRef(null);

    const setRef = useCallback((node) => {
        mapaRef.current = node;
    }, []);

    const { organizacionesMarkers, startLoadMarkersOrg } = useMarkerStore();
    const { modalShowOrganizacion } = useUiOrganizacion();
    const { startShowOrganizacion } = useOrganizacionStore();

    useEffect(() => {
        startLoadMarkersOrg();
    }, []);

    useEffect(() => {
        mapa.current = new mapboxgl.Map({
            container: mapaRef.current,
            style: "mapbox://styles/mapbox/navigation-night-v1",
            center: [initialPoints.longitud, initialPoints.latitud],
            zoom: initialPoints.zoom,
        });

        //Add Layer
        mapa.current?.on("load", () => {
            let hoveredStateId = null;

            mapa.current?.addSource("states", {
                type: "geojson",
                data: geojson,
            });

            mapa.current?.addLayer({
                id: "state-fills",
                type: "fill",
                source: "states",
                layout: {},
                paint: {
                    "fill-color": "#18EC10",
                    "fill-opacity": [
                        "case",
                        ["boolean", ["feature-state", "hover"], false],
                        1,
                        0.5,
                    ],
                },
            });

            mapa.current?.addLayer({
                id: "state-borders",
                type: "line",
                source: "states",
                layout: {},
                paint: {
                    "line-color": "#0d7509",
                    "line-width": 2,
                },
            });

            mapa.current?.on("mousemove", "state-fills", (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        mapa.current?.setFeatureState(
                            { source: "states", id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    mapa.current?.setFeatureState(
                        { source: "states", id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            mapa.current?.on("mouseleave", "state-fills", () => {
                if (hoveredStateId !== null) {
                    mapa.current?.setFeatureState(
                        { source: "states", id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });
        });
    }, []);



    useEffect(() => {
        organizacionesMarkers.some((marker) => {
            const m = new mapboxgl.Marker({ color: "#b40219" })
                .setLngLat([marker.longitud, marker.latitud])
                .addTo(mapa.current);

            const popup = new AnimatedPopup({
                offset: 25,
                openingAnimation: {
                    duration: 1000,
                    easing: "easeOutElastic",
                    transform: "scale",
                },
                closingAnimation: {
                    duration: 300,
                    easing: "easeInBack",
                    transform: "scale",
                },
            }).setHTML("<h4>" + marker.nombre_organizacion + "</h4>");
            const markerDiv = m.getElement();
            markerDiv.addEventListener("mouseenter", () => {
                m.setPopup(popup);
                m.togglePopup();
            });

            markerDiv.addEventListener("mouseleave", () => m.togglePopup());

            m.getElement().addEventListener("click", () => {
                startShowOrganizacion(marker.id);
                modalShowOrganizacion(1);
            });
        });
    }, [organizacionesMarkers]);

    return (
        <>
            <div ref={setRef} className="mapContainer" />
            <ModalProyecto />
            <FloatButton />
            <FloatChartBtn />
            <FloatAddButton />
            <FloatOrgButton />
            <DrawerMenu />
            <DrawerOrg />
            <ModalShowOrganizacion />
            <ModalInformation />
            <ModalCharts />
        </>
    );
};
