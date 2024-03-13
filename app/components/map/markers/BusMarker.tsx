import React, { memo } from 'react';
import { Marker } from 'react-native-maps';
import BusMapIcon from '../BusMapIcon';
import BusCallout from '../BusCallout';
import { IVehicle } from 'utils/interfaces';

import useAppStore from '../../../data/app_state';
import { getLighterColor } from 'app/utils';

interface Props {
    bus: IVehicle,
    tintColor: string,
    routeName: string
}

// Bus Marker with icon and callout
const BusMarker: React.FC<Props> = ({ bus, tintColor, routeName }) => {
    const selectedRouteDirection = useAppStore(state => state.selectedRouteDirection);
    const setSelectedDirection = useAppStore(state => state.setSelectedRouteDirection);

    const busColor = selectedRouteDirection === bus.directionKey ? tintColor : tintColor+"70";
    const borderColor = selectedRouteDirection === bus.directionKey ? getLighterColor(tintColor) : undefined;
    const iconColor = selectedRouteDirection === bus.directionKey ? "white" : "#ffffffcc";

    //if direction is not selected and route is inactive, then call setSelectedDirection w/ parameter bus.directionKey
    const busDefaultDirection = () => {
        if (selectedRouteDirection !== bus.directionKey)
    {
        setSelectedDirection(bus.directionKey);
    }
    }
    
    
    return (
        <Marker
            key={bus.key}
            coordinate={{ latitude: bus.location.latitude, longitude: bus.location.longitude }}
            tracksViewChanges={false}
            anchor={{x: 1, y: 1}}
            pointerEvents="auto"
            style={{ zIndex: 100, elevation: 100 }}
            onPress={() => busDefaultDirection()}
        >
            {/* Bus Icon on Map*/}
            <BusMapIcon 
                tintColor={busColor}
                heading={bus.location.heading} 
                active={selectedRouteDirection === bus.directionKey} 
            />

            <BusCallout 
                directionName={bus.directionName} 
                fullPercentage={Math.round((bus.passengersOnboard / bus.passengerCapacity)*100)}
                amenities={bus.amenities} 
                tintColor={busColor ?? "#500000"} 
                routeName={routeName} 
                busId={bus.name}
            />
        </Marker>
    );
};

export default memo(BusMarker);
