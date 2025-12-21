import { View } from "react-native";

import AuthInput from "../../shared/ui/AuthInput/AuthInput.jsx";

import { inputLoginData, inputRegisterData } from "./const/constants";


function AuthInputForm({
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    isLogin
}) {
    const inputData = isLogin ? inputLoginData : inputRegisterData;

    return (
        <View style={{ width: '100%', marginTop: 20, gap: 5 }}>
            {inputData.map((input, index) =>
                <AuthInput
                    key={index}
                    placeholder={input.placeholder}
                    keyboardType={input.keyboardType}
                    isPassword={input.isPassword}
                    type={input.label}
                    value={input.label === "mail" ? email : (input.label === "user" ? name : (input.passwordType === "default" ? password : confirmPassword))}
                    onChangeText={input.label === "mail" ? setEmail : (input.label === "user" ? setName : (input.passwordType === "default" ? setPassword : setConfirmPassword))}
                />
            )}
        </View>
    );
}

export default AuthInputForm;