using Domain;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Tickets.Any()) return;

            var tickets = new List<Ticket>
            {
                new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = "Login Issue Updated",
                    Description = "Unable to log in. Getting an authentication error.",
                    DateCreated = DateTime.Now.AddDays(-5),
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "123-456-7890",
                    Priority = "User is having trouble remembering the password.",
                    Status = "Open",
                    AssignedTo = "Support Team"
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
                    Priority = "Crash occurs during the checkout process.",
                    Status = "In Progress",
                    AssignedTo = "Development Team"
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
                    Priority = "Hardware issue with the power supply.",
                    Status = "Open",
                    AssignedTo = "IT Team"
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
                    Priority = "User is unable to access shared drives.",
                    Status = "Open",
                    AssignedTo = "Network Team"
                },
            };

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }
    }
}
