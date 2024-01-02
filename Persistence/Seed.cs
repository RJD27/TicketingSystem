using Domain;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context){
            if(context.Tickets.Any()) return;
            var tickets = new List<Ticket>{
                new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = "Login Issue",
                    Description = "Unable to log in. Getting an authentication error.",
                    DateCreated = DateTime.Now.AddDays(-5),
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "123-456-7890",
                    UserOperatingSystem = Domain.OperatingSystem.Windows
                },
                new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = "Software Crash",
                    Description = "Application crashes when performing a specific action.",
                    DateCreated = DateTime.Now.AddDays(-3),
                    Name = "Jane Smith",
                    Email = "jane.smith@example.com",
                    PhoneNumber = "987-654-3210",
                    UserOperatingSystem = Domain.OperatingSystem.Linux
                },
                new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = "Hardware Malfunction",
                    Description = "The computer is making strange noises, and there's a burning smell.",
                    DateCreated = DateTime.Now.AddDays(-2),
                    Name = "Bob Johnson",
                    Email = "bob.johnson@example.com",
                    PhoneNumber = "555-123-4567",
                    UserOperatingSystem = Domain.OperatingSystem.Mac
                },
                new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = "Network Connectivity Issue",
                    Description = "Unable to connect to the office network. No internet access.",
                    DateCreated = DateTime.Now.AddDays(-1),
                    Name = "Alice Williams",
                    Email = "alice.williams@example.com",
                    PhoneNumber = "777-999-8888",
                    UserOperatingSystem = Domain.OperatingSystem.Windows
                },
            };
            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();;
        }
    }
}