# Documentation

## Instalacion y ejecucion

### Clonar repositorio

- Obtener codigo fuente
  ```
  git clone https://github.com/pablomailhet/backend3_70435.git
  ```

- Acceder a la carpeta
  ```
  cd backend3_70435
  ```

- Instalar dependencias npm
  ```
  npm install
  ```

### Iniciar el servidor, antes debe copiar las variables de entornos.

- Iniciar el servidor modo dev
  ```
  npm run dev
  ```
- Iniciar el servidor modo test
  ```
  npm run test
  ```
- Iniciar el servidor modo prod
  ```
  npm start
  ```

## Mocks

### Products

- Crear 100 productos usando mocks
  ```
  http://localhost:8080/api/mocks/products/100
  ```

### Users

- Crear 10 usuarios usando mocks, el password por defecto es coder1234
  ```
  http://localhost:8080/api/mocks/users/10
  ```

## Docker

### Build image

- Crear la imagen con el siguiente comando
  ```
  docker build -t pmcommerce70435 .
  ```

### Run image

- Ejecutar la imagen con el siguiente comando
  ```
  docker run -p 3000:9000 pmcommerce70435
  ```

## DockerHub

### Pull image

- Obtener la imagen desde dockerhub
  ```
  docker pull pablomailhet/pmcommerce70435:1.0.0
  ```
### Run image

- Ejecutar la imagen de dockerhub
  ```
  docker run -p 3000:9000 pablomailhet/pmcommerce70435:1.0.0
  ```