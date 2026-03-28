export class Cookie {
    static get(name:string) {
        if(!name) return null;
        const nameEQ = name + "="; // Crea el string que buscamos (Ej: "username=")
        const ca = document.cookie.split(';'); // Divide todas las cookies en un array

        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') { // Elimina espacios en blanco al principio
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) { // Si la cookie comienza con el nombre buscado
                return decodeURIComponent(c.substring(nameEQ.length, c.length)); // Devuelve el valor decodificado
            }
        }
        return null; // Si no se encuentra la cookie
    }

    static set(name:string, value:string, days:number) {
        const d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    static delete(name:string, path?:string, domain?:string) {
         document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" +
            (path ? "; path=" + path : "") +
            (domain ? "; domain=" + domain : "");
    }

}