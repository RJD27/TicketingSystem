using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest 
        {
            public Ticket Ticket { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler (DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Tickets.Add(request.Ticket);

                await _context.SaveChangesAsync();
            }
        }
    }
}