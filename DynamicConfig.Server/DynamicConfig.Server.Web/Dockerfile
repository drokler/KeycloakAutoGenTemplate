FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DynamicConfig.Server.Web/DynamicConfig.Server.Web.csproj", "DynamicConfig.Server.Web/"]
RUN dotnet restore "DynamicConfig.Server.Web/DynamicConfig.Server.Web.csproj"
COPY . .
WORKDIR "/src/DynamicConfig.Server.Web"
RUN dotnet build "DynamicConfig.Server.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DynamicConfig.Server.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DynamicConfig.Server.Web.dll"]
