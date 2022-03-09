import { useEffect, useState } from 'react'
import Button from '../components/Button'
import CollectionBox from '../components/CollectionBox'
import Header from '../components/Header'
import subdomains from '../data/subdomains'
import Web3 from 'web3'
import useDebounce from '../hooks/useDebounce'
import erc721 from '../data/abis/erc721.json'
import axios from 'axios'

export default function IndexPage() {
    const [slugInput, setSlugInput] = useState('')
    const [_nftIdInput, setNftIdInput] = useState('')
    const nftIdInput = useDebounce(_nftIdInput, 500)

    const [nft, setNft] = useState(null)
    const [selectedCollection, setSelectedCollection] = useState(null)
    const [selectedDomain, setSelectedDomain] = useState(null)

    const [loadingNft, setLoadingNft] = useState(false)

    useEffect(() => {
        setNft(null)
        setSlugInput('')
        setNftIdInput('')
        setSelectedDomain(null)
    }, [selectedCollection])

    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
    useEffect(() => {
        if (!selectedCollection) return
        if (!nftIdInput) return

        const loadNft = async () => {
            setLoadingNft(true)
            try {
                const { data } = await axios.get(`https://api.opensea.io/api/v1/asset/${selectedCollection.address}/${nftIdInput}/`)
                console.log(data)
                setNft(data)
            } catch (error) {
                setNft(null)
                console.log(error)
            }
            setLoadingNft(false)
        }

        loadNft()
    }, [nftIdInput, selectedCollection])

    return (
        <>
            <div className="py-12 md:py-24 border-b border-neutral-700  border-opacity-50">
                <div className="max-w-lg mx-auto p-6 space-y-4">
                    <p className="inline-block text-xs bg-blue-400 text-neutral-900 px-2 py-1 rounded animate-pulse uppercase font-extrabold">New!</p>
                    <p className="text-5xl font-extrabold">Register a sub-address for your NFT.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 py-12 md:py-24  space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        {subdomains.map((collection) => (
                            <CollectionBox collection={collection} {...{ selectedCollection, setSelectedCollection, selectedDomain, setSelectedDomain }} />
                        ))}
                    </div>

                    <div>
                        {(!selectedCollection || !selectedDomain) && (
                            <div className="bg-neutral-700 p-12 text-xs py-24 text-center">
                                <p className="opacity-50">Select a collection + subdomain to proceed.</p>
                            </div>
                        )}

                        {selectedCollection && selectedDomain && (
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="space-y-2 w-full">
                                        <div className="flex">
                                            <p className="flex-1">Enter the tokenId of your NFT.</p>
                                            {loadingNft && (
                                                <p className="">
                                                    <i className="fas fa-circle-notch animate-spin"></i>
                                                </p>
                                            )}
                                        </div>
                                        <input value={_nftIdInput} onChange={(e) => setNftIdInput(e.target.value)} className="bg-transparent bg-white bg-opacity-10 p-2 w-full rounded" type="text" />
                                    </div>
                                </div>
                                {nft && (
                                    <div className="space-y-2">
                                        <p>Enter your desired subdomain slug.</p>
                                        <input value={slugInput} onChange={(e) => setSlugInput(e.target.value)} className="bg-transparent bg-white bg-opacity-10 p-2 w-full rounded" type="text" />
                                        <div className="p-6 bg-neutral-400 text-neutral-800 text-center space-y-4">
                                            <img className="mx-auto w-32 h-32 rounded shadow-2xl" src={nft.image_url} alt="" />
                                            <div>
                                                <p className="text-xs">Your sub-address will be:</p>
                                                <p className="font-extrabold">
                                                    {slugInput || 'xxx'}.{selectedDomain.name}
                                                </p>
                                            </div>
                                        </div>
                                        <Button className="bg-blue-500 text-neutral-800">Register sub-address</Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-24 border-t border-neutral-700 border-opacity-50">
                <div className="max-w-lg mx-auto p-6 space-y-4 text-center">
                    <p className="text-2xl font-extrabold">Made with ❤️ in Florida</p>
                    <p className="text-center">ENS NFT APP &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </>
    )
}
