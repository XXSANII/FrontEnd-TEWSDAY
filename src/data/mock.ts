// Remaining mock data (chat) until those screens are wired to the API.
export const conversations = [
  { id: "c1", name: "Dr. Elena Rostova", last: "Sure, see you at 16:00 with the formula sheet.", time: "10:42", unread: 2, online: true },
  { id: "c2", name: "Marcus Vance", last: "I uploaded the past paper walkthrough.", time: "Yesterday", unread: 0, online: false },
  { id: "c3", name: "Sarah Lin", last: "Please send the outline draft by Friday.", time: "Mon", unread: 0, online: true },
];

export const messages = [
  { from: "them", text: "Hi Ploy! Ready for today's integration by parts session?", time: "10:30" },
  { from: "me", text: "Yes! I struggled with problem 4.2 though — the polar coordinates part.", time: "10:34" },
  { from: "them", text: "No problem, we'll start with that. Please bring your notes.", time: "10:38" },
  { from: "them", text: "Sure, see you at 16:00 with the formula sheet.", time: "10:42" },
];
