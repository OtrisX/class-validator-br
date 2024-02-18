import { registerDecorator } from "class-validator"

export function IsCNPJ() {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            name: "IsCPF",
            target: target.constructor,
            constraints: [],
            propertyName: propertyName,
            validator: {validate(){}}
        })
    }
}