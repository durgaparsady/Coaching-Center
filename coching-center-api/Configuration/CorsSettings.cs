namespace coching_center_api.Configuration;

public sealed class CorsSettings
{
    public const string SectionName = "Cors";
    public const string PolicyName = "CorsPolicy";

    public string[] AllowedOrigins { get; set; } = [];
}
