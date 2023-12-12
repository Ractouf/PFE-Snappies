function goToMaps(address) {
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode:driving`
}

const Client = ({ client }) => {
    const allBoxesDelivered = client.boxes.every(box => box.is_delivered);

    return (
        <div class = "client">
            <input disabled class = "delivered" checked = {allBoxesDelivered} type = "checkbox"/>
            <div class = "client-info">
                <h3>{client.name}</h3>
                <h4>{client.address}</h4>
            </div>
            <img onClick = {() => goToMaps(client.address)} class = "google-maps-logo" src = "/src/assets/googleMaps.png" alt = "maps"/>
        </div>
    );
};

export default Client;
