window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 44.12427,
                lng: 20.078834,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    let assets = document.querySelector('a-assets');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let asset = document.createElement('a-asset-item');
        asset.setAttribute('id', "glb-asset");
        asset.setAttribute('src', 'assets/kuca_bez_parka3.glb');
        assets.appendChild(asset);

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', "#glb-asset");
        //model.setAttribute('rotation', '0 180 0');
        //model.setAttribute('animation-mixer', '');
        model.setAttribute('gesture-handler', '');
        model.setAttribute('scale', '0.04 0.04 0.04');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(assets);
        scene.appendChild(model);
    });
}