namespace Domain
{
    public enum OperatingSystem
    {
        Windows,
        Linux,
        Mac
    }
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public OperatingSystem UserOperatingSystem { get; set; }

    }
}