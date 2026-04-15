# Các bước implement database

 1. Tải và cài đặt [PostgreSQL](https://www.postgresql.org/download/)
 2. Mở file .sln bằng Visual Studio
 3. Liên hệ KYoru và nhận file appsettings.json, đổi trường Password thành mật khẩu đã chọn trong quá trình cài đặt
 4. Nếu chưa cài đặt EF Core Tools: mở Terminal hoặc cmd và chạy `dotnet tool install --global dotnet-ef`
 5. Chọn Tools > NuGet Package Manager > Package Manager Console (PMC)
 6. Kiểm tra Startup Project là CCG.API (gần nút Start)
 7. Kiểm tra Default Project là CCG.Core (trên cùng khu vực PMC)
 8. Trong PMC, chạy `Update-Database`

# Kế hoạch phát triển

 - Bổ sung cấu trúc database
 - Hoàn thiện các file Service
 - Hoàn thiện các file Controller và mở API