import Button from "../ui/button";

type HeaderProps = {
    title: string, 
    path: string
}

const headerUrl: HeaderProps[] = [
    {
        title: 'Home',
        path:'/'
    },
    {
        title: 'Tokens',
        path:'/'
    },
    {
        title: 'Leaderboard',
        path:'/'
    }
]

export const Header = () => {
  return (
    <div className='flex py-3  container items-center gap-3 justify-between'>
        <div>
            <div>Logo</div>
            
        </div>

        <div>
            <ul className="flex items-center  gap-5">
            {
               headerUrl.map (( {title , path } , key) => <li key={key}>{title}</li>)
            }
            </ul>
        </div>

        <div>
            <Button>Connect Wallet</Button>
        </div>
    </div>
  )
}
