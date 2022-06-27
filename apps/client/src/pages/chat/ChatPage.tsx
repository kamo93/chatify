import Chat from './components/Chat';

function ChatPage() {
  return (
    <main className="grid grid-cols-12 h-[calc(100vh_-_53px)]">
      <section className="col-span-3 border-r border-blue-600">
        <h4>Chats</h4>
        <p>here</p>
      </section>
      <section className="col-span-6 border-r border-r-blue-600 grid grid-rows-[min-content_auto_min-content] max-h-[calc(100vh_-_53px)]">
        <h1 className="m-6">Chat title</h1>
        <Chat />
      </section>
      <section className="col-span-3">
        <p>here</p>
      </section>
    </main>
  );
}

export default ChatPage;
