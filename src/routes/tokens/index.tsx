import { createFileRoute } from '@tanstack/react-router'
import PreviewTokenPage from '../../pages/views/previewToken';

export const Route = createFileRoute('/tokens/')({
  component: () => <PreviewTokenPage/>
});
