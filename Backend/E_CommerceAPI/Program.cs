using APILayer.Config;
using APILayer.Jwt;
using BusinessLayer.CoreOfLogicOperations;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.AutoMapper;
using DataAccessLayer.Data;
using DataAccessLayer.RepoInterfaces;
using DataAccessLayer.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.AddConsole();

// DB Context
builder.Services.AddDbContext<ECommerceDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConStr"));
});

// Business Services
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IBrand, BrandService>();
builder.Services.AddScoped<ICategory, CategoryService>();
builder.Services.AddScoped<ICity, CityService>();
builder.Services.AddScoped<IProduct, ProductService>();
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IPayment, PaymentService>();
builder.Services.AddScoped<IAddress, AddressService>();
builder.Services.AddScoped<IReviewAndRating, ReviewAndRatingService>();
builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<IFavoritProducts, FavoritProductsService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("https://saloshop.netlify.app")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// ? Register Options
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<PayPalSettings>(builder.Configuration.GetSection("PayPal"));
builder.Services.AddSingleton(sp => sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<JwtOptions>>().Value);

// ? JWT Authentication
var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>()
    ?? throw new Exception("JWT configuration section is missing or invalid.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey))
        };
    });

var app = builder.Build();

// ? Developer Exception Page (development only)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Middlewares
app.UseCors("AllowReactApp");
app.UseStaticFiles();

app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
