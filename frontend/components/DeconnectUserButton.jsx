import { useDispatch } from 'react-redux';
import { disconnectUser } from '../reducers/user';
import Button from './buttons/Button';

export default function DeconnectUserButton({ navigation }) {
    const dispatch = useDispatch();

    // Retrait des informations du reducer et redirection vers la landing page
    const handleDisconnectUser = () => {
        dispatch(disconnectUser());
        navigation.navigate('Landing');
    };

    return (
        <Button
            label='Me déconnecter'
            type='redStroke'
            icon='sign-out'
            iconSize={20}
            onPress={() => handleDisconnectUser()}
        />
    );
}
