import { useDispatch } from "react-redux";
import ButtonRegular from "./buttons/ButtonRegular";
import { disconnectUser } from "../reducers/user";

export default function DeconnectUserButton({ navigation }) {
    const dispatch = useDispatch()

    const handleDisconnectUser = () => {
        dispatch(disconnectUser())
        navigation.navigate('Landing')
    }

    return (
        <ButtonRegular text="Me déconnecter" onPress={() => handleDisconnectUser()} />
    )
}