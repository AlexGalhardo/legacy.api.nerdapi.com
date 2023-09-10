class Name {
    constructor() {
        this.isValidSingleName = this.isValidSingleName.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    public isValidSingleName(name: string): boolean {
        if (!name || name.length <= 3) return false;
        const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
        return regexOfValidNamesWithAcents.test(name);
    }

    public isValid(fullName: string): boolean {
        const names = fullName.split(" ");
        if (names.length > 1) {
            for (const name of names) {
                if (!this.isValidSingleName(name)) return false;
            }
        } else {
            if (!this.isValidSingleName(fullName)) return false;
            return true;
        }
        return true;
    }

    public capitalize(fullName: string): string {
        if (!this.isValid(fullName)) throw new Error("Invalid person name");

        const arr = fullName.toLowerCase().split(" "),
            prepositions = ["da", "de", "do", "das", "dos", "e"];

        for (let i = 0; i < arr.length; i++) {
            arr[i] = !prepositions.includes(arr[i]) ? arr[i].charAt(0).toUpperCase() + arr[i].slice(1) : arr[i];
        }

        return arr.join(" ");
    }

    public get methods() {
        return {
            isValidFullName: this.isValid,
            isValid: this.isValid,
            capitalizeNames: this.capitalize,
        };
    }
}

export default Name;
