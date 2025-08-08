import { useState, useEffect } from "react";

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('./src/data/usuarios.json')
          .then(res => res.json())
          .then(data => setUsuarios(data))
          .catch(() => setUsuarios([]));
      }, []);

      return {
        usuarios
      }
}