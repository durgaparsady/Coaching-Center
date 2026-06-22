# Coching Center Workspace

This workspace contains two independent projects so you can deploy them separately.

## Projects

- `coching-center-client` (React + Vite + JSX + Redux Toolkit + Router)
- `coching-center-api` (.NET Web API + JWT auth)

## Folder Structure

```text
coching-center/
  coching-center-client/
    src/
      app/
      features/
        auth/
        courses/
        students/
      layouts/
      pages/
      routes/
      services/
      styles/
  coching-center-api/
    Controllers/
    Contracts/
    Data/
    Models/
    Services/
```

## Default Admin Login

- Username: `admin`
- Password: `Admin@123`

Change credentials in `coching-center-api/appsettings.json` before production.

## Run API

```bash
cd coching-center-api
dotnet run
```

Default URL (dev): `https://localhost:7168`

## Run Client

```bash
cd coching-center-client
npm install
npm run dev
```

Default URL (dev): `http://localhost:5173`

## Build for publish

API:

```bash
cd coching-center-api
dotnet publish -c Release
```

Client:

```bash
cd coching-center-client
npm run build
```
