# Crypto App - React Native

Una aplicación de seguimiento de criptomonedas desarrollada con React Native utilizando una arquitectura orientada a objetos (OOP) y principios SOLID.

## Estructura del Proyecto

El proyecto sigue una arquitectura de capas basada en principios de diseño orientado a objetos:

```
/src
  /core                # Núcleo de la aplicación
    /interfaces        # Interfaces y contratos
    /models            # Modelos de dominio
    /services          # Servicios abstractos
  
  /infrastructure      # Implementaciones concretas
    /api               # Servicios de API
    /repositories      # Repositorios
  
  /presentation        # Capa de presentación
    /components        # Componentes de UI
    /hooks             # Hooks personalizados
    /pages             # Pantallas de la aplicación
```

## Patrones de Diseño Implementados

### 1. Inyección de Dependencias

Utilizamos un contenedor de dependencias simple (`DependencyContainer`) para implementar la inversión de control:

```typescript
// Obtener una instancia del repositorio
const coinRepository = DependencyContainer.getInstance().resolve<CoinRepository>('coinRepository');
```

### 2. Patrón Repositorio

Separamos la lógica de acceso a datos de los modelos con el patrón repositorio:

```typescript
// Repositorio para acceder a los datos de monedas
export class CoinRepository implements IRepository<Coin, string> {
  // ...
}
```

### 3. Patrón Fábrica

Utilizamos métodos de fábrica en nuestros modelos para crear instancias a partir de los datos de la API:

```typescript
// Crear una instancia de Coin desde la respuesta de la API
static fromApiResponse(data: any): Coin {
  return new Coin({
    id: data.id,
    name: data.name,
    // ...
  });
}
```

## Principios SOLID Aplicados

1. **S - Principio de Responsabilidad Única**: Cada clase tiene una sola razón para cambiar.
2. **O - Principio de Abierto/Cerrado**: Las clases están abiertas para extensión pero cerradas para modificación.
3. **L - Principio de Sustitución de Liskov**: Podemos sustituir las implementaciones por sus interfaces.
4. **I - Principio de Segregación de Interfaces**: Utilizamos interfaces específicas en lugar de una grande.
5. **D - Principio de Inversión de Dependencias**: Dependemos de abstracciones, no implementaciones concretas.

## Modelos

### Coin

Representa una criptomoneda con su información básica, como precio, nombre, símbolo, etc.

### Market

Representa un mercado (exchange) donde se puede comerciar una criptomoneda.

### Exchange

Representa un exchange de criptomonedas con su información básica.

## Funcionamiento

1. Los datos se obtienen a través de servicios (implementando `IAPIService`)
2. Los repositorios transforman los datos de la API en objetos de dominio
3. Los hooks personalizados utilizan los repositorios para proporcionar datos a los componentes
4. Los componentes UI consumen los datos a través de los hooks

## Características

- Separación clara de responsabilidades
- Código modular y testeable
- Inversión de dependencias
- Reutilización de lógica de negocio
- Abstracciones claras para cada capa de la aplicación

## Tecnologías Utilizadas

- React Native
- TypeScript
- Zustand (para gestión de estado)
- React Navigation
- Coinlore API

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
