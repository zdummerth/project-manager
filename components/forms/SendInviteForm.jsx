import React, { useState } from 'react'
import styled from 'styled-components'
import { useInvites, useAllUsers } from 'lib/hooks'
import { CheckDouble } from '@styled-icons/boxicons-regular'
import { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import SearchUsers from 'components/SearchUsers'
// import LoadingIndicator from 'components/shared/LoadingIndicator'


const AllUsers = ({ projectId, projectMembers }) => {
    const { users } = useAllUsers()
    const { createInvite, invites } = useInvites()
    // console.log('all users')


    const filtered = users?.data.filter(u => !projectMembers.map(m => m._id).includes(u._id))
    const checkedUsers = invites ? invites.sentInvites.data.map(inv => inv.to._id) : []
    return (
        <SearchUsers
            users={filtered ? filtered : []}
            checkedUsers={checkedUsers}
            onUserClick={(userId) => createInvite(userId, projectId)}
            invites={invites ? invites.sentInvites.data : []}
            isInvite={true}
        />
    )
}

export default function SendInviteForm({
    loading,
    projectId,
    task,
    projectMembers,
    isInvite,
    updateTask,
    taskId
}) {

    // console.log('project members: ', projectMembers)

    return (
        <>
            {isInvite ? (
                <AllUsers
                    projectId={projectId}
                    projectMembers={projectMembers}
                />
            ) : (
                <SearchUsers
                    users={projectMembers}
                    checkedUsers={task.assignedTo.data.map(u => u._id)}
                    projectId={projectId}
                    onUserClick={(userId) => updateTask(taskId, {
                        assignedTo: {
                            connect: [userId]
                        }
                    })}
                    isInvite={false}
                />
            )}

        </>
    )
}