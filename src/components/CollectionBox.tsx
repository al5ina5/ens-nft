import classNames from 'classnames'

export default function CollectionBox({ collection, selectedCollection, setSelectedCollection, selectedDomain, setSelectedDomain }) {
    const active = selectedCollection && selectedCollection.address === collection.address
    return (
        <>
            <button
                onClick={() => setSelectedCollection((_) => collection)}
                key={collection.address}
                className={classNames('w-full text-left border border-neutral-400 p-2 space-y-2', active && 'bg-neutral-400 text-neutral-800')}
            >
                <div className="flex space-x-4">
                    <p className="whitespace-nowrap">{collection.name}</p>
                    <p className="truncate">{collection.address}</p>
                </div>
            </button>
            {active && (
                <div className="space-y-2 border border-neutral-400 p-6">
                    <p>Choose a domain:</p>
                    <div className="flex gap-4">
                        {collection.subdomains.map((subdomain) => {
                            const domainActive = selectedDomain && selectedDomain.hash === subdomain.hash
                            return (
                                <button onClick={() => setSelectedDomain(subdomain)} className={classNames('bg-neutral-400 text-neutral-800 border border-neutral-800 px-4 py-2', domainActive && 'bg-blue-500')}>
                                    <p>xxx.{subdomain.name}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
