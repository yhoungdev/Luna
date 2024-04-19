import { createFileRoute } from '@tanstack/react-router'
import LeaderBoardPage from '../pages/leaderboard'

export const Route = createFileRoute('/leaderboard')({
  component: () => <LeaderBoardPage/>
})