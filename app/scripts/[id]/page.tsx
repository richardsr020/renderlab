import React from 'react';
import ScriptDetails from '../../../components/scripts/ScriptDetails';

export default function ScriptDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <ScriptDetails id={params.id} />
    </div>
  );
}
