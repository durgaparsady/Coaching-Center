namespace coching_center_api.Contracts;

public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username, DateTime ExpiresAtUtc);
