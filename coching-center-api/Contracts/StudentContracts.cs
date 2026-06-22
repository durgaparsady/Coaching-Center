namespace coching_center_api.Contracts;

public record StudentRequest(string FullName, string Email, string PhoneNumber, int CourseId);
