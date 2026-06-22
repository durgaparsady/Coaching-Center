# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy all files
COPY . .

# Restore dependencies
RUN dotnet restore coching-center-api.csproj

# Publish application
RUN dotnet publish coching-center-api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Render provides PORT environment variable
ENV ASPNETCORE_URLS=http://+:${PORT}

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "coching-center-api.dll"]