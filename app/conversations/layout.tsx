import Sidebar from "../_components/sidebar/Sidebar"
import getCoversations from "../actions/getConversations"
import getUsers from "../actions/getUsers";
import ConversationList from "./_components/ConversationList"

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const conversations = await getCoversations();
    const users = await getUsers();
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}