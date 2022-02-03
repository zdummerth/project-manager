import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { useInvites } from 'lib/hooks'
import { Check, X, Album } from '@styled-icons/boxicons-regular'
import Invite from 'components/invites/Invite'
import { BlankButton } from 'components/shared/Button'


const List = ({ items, accept, remove, updating }) => (
    <>
        {items.map((inv) => {
            return (
                <Flex ai='center' jc='space-between' className='std-div bg w-100' key={inv._id}>
                    <div>@{inv.to.handle}</div>
                    <Flex ai='center'>
                        {updating === inv._id ? (
                            <Album size='18' className='rotate' />
                        ) : (
                            <>
                                <BlankButton id={inv._id} disabled={updating} onClick={remove} className='c-delete'>
                                    remove
                                </BlankButton>
                                {accept && (
                                    <BlankButton id={inv._id} disabled={updating} onClick={accept} className='c-brand'>
                                        accept
                                    </BlankButton>
                                )}
                            </>
                        )}
                    </Flex>
                </Flex>
            )
        })}
    </>
)

export const Sent = ({ projectId }) => {
    const { invites, updating, deleteInvite } = useInvites()
    const items = invites ? invites.sentInvites.data.filter(inv => inv.project._id === projectId) : []

    const remove = (e) => {
        const id = e.currentTarget.id
        deleteInvite(id)
    }
    return (
        <List
            items={items}
            remove={remove}
            updating={updating}
        />
    )
}

export const Received = () => {
    const { invites, acceptInvite, updating, deleteInvite } = useInvites()
    const items = invites ? invites.receivedInvites.data : []

    const remove = (e) => {
        const id = e.currentTarget.id
        deleteInvite(id)
    }

    const accept = (e) => {
        const id = e.currentTarget.id
        acceptInvite(id)
    }
    return (
        <List
            items={items}
            remove={remove}
            updating={updating}
            accept={accept}
        />
    )
}
