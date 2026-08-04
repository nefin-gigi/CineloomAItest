'use client';

import { useMemo, useState } from 'react';

const lockOptions = [
  ['character', 'Character identity'],
  ['location', 'Location continuity'],
  ['style', 'Visual style'],
  ['camera', 'Camera/lens'],
  ['axis', '180° axis'],
  ['timing', 'Panel timing'],
  ['neighbor_continuity', 'Previous/next boards'],
  ['export_manifest', 'Export manifest']
];

const sampleBoards = Array.from({ length: 12 }, (_, index) => ({
  boardIndex: index + 1,
  boardId: `board-${String(index + 1).padStart(4, '0')}`,
  title: ['Wide arrival', 'Tracking move', 'Insert clue', 'Reaction close-up', 'Reveal doorway', 'Export beat'][index % 6],
  time: `${(index + 1) * 1.5}s`
}));

export function DirectorSingleBoardAgent({ adminMode = false }: { adminMode?: boolean }) {
  const [boardIndex, setBoardIndex] = useState(417);
  const [totalBoards, setTotalBoards] = useState(1000);
  const [prompt, setPrompt] = useState('Make this specific board more emotional and cinematic. Keep the same character, camera angle, costume, location, style, and 180-degree screen direction. Do not change any other boards.');
  const [locks, setLocks] = useState(lockOptions.map(([id]) => id));
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);

  const targetBoardId = useMemo(() => `board-${String(Math.max(1, Math.min(boardIndex, totalBoards))).padStart(4, '0')}`, [boardIndex, totalBoards]);

  function toggleLock(id: string) {
    setLocks((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  async function runAgent(dryRun = false) {
    setBusy(true);
    setResult({ status: 'working', message: 'Preparing single-board agent patch...' });
    try {
      const response = await fetch(adminMode ? '/api/super-admin/agent-harness' : '/api/agent-harness/change-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: 'ws_demo',
          projectId: 'project_rainy_backlot',
          storyboardId: 'storyboard_1000_panel_demo',
          boardId: targetBoardId,
          boardIndex,
          totalBoards,
          directorPrompt: prompt,
          currentBoardPrompt: 'Medium close-up of the filmmaker in the rainy studio backlot, blue rim light, cinematic pencil storyboard style.',
          previousBoardSummary: 'Previous board: character walks toward the glowing studio door from screen left to screen right.',
          nextBoardSummary: 'Next board: character pushes open the heavy door, preserving left-to-right screen direction.',
          locks,
          stitchMode: 'block_until_approved',
          dryRun
        })
      });
      const data = await response.json();
      setResult(data.result ?? data);
    } catch (error) {
      setResult({ ok: false, status: 'client_error', message: error instanceof Error ? error.message : 'Agent harness failed.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="agent-harness-grid" aria-label="Director single-board AI harness">
      <article className="agent-card agent-primary">
        <div className="agent-card-head">
          <span className="agent-kicker">ChatGPT Agent Harness</span>
          <h2>Change one storyboard board without touching the other 999.</h2>
          <p>Directors can target a single board, give a plain-English note, preserve continuity locks, then approve the patch before the dynamic storyboard is stitched.</p>
        </div>

        <div className="agent-target-row">
          <label>
            <span>Board number</span>
            <input type="number" min="1" max="1000" value={boardIndex} onChange={(event) => setBoardIndex(Number(event.target.value))} />
          </label>
          <label>
            <span>Total boards</span>
            <input type="number" min="1" max="1000" value={totalBoards} onChange={(event) => setTotalBoards(Number(event.target.value))} />
          </label>
          <div className="agent-target-pill">
            <span>Target board</span>
            <strong>{targetBoardId}</strong>
          </div>
        </div>

        <label className="agent-field">
          <span>Director prompt</span>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        </label>

        <div className="agent-locks" aria-label="Continuity locks">
          {lockOptions.map(([id, label]) => (
            <button key={id} type="button" className={locks.includes(id) ? 'active' : ''} onClick={() => toggleLock(id)}>
              <span aria-hidden="true">{locks.includes(id) ? '✓' : '+'}</span>{label}
            </button>
          ))}
        </div>

        <div className="agent-actions">
          <button type="button" disabled={busy} onClick={() => runAgent(false)}>Run single-board agent</button>
          <button type="button" className="secondary" disabled={busy} onClick={() => runAgent(true)}>Dry-run API payload</button>
        </div>
      </article>

      <article className="agent-card">
        <div className="agent-card-head compact">
          <span className="agent-kicker">Storyboard scale</span>
          <h2>1,000-board workflow</h2>
          <p>The selected board is patched; all other boards are locked until the director approves.</p>
        </div>
        <div className="agent-board-strip">
          {sampleBoards.map((board) => (
            <div key={board.boardId} className={board.boardIndex === ((boardIndex - 1) % 12) + 1 ? 'selected' : ''}>
              <strong>{String(board.boardIndex).padStart(2, '0')}</strong>
              <span>{board.title}</span>
              <small>{board.time}</small>
            </div>
          ))}
        </div>
        <div className="agent-stitch-gate">
          <strong>Dynamic stitch gate</strong>
          <span>Blocked until director approval</span>
        </div>
      </article>

      <article className="agent-card agent-result">
        <div className="agent-card-head compact">
          <span className="agent-kicker">API result</span>
          <h2>Patch contract</h2>
          <p>Backend can plug in any ChatGPT-compatible agent endpoint plus storyboard correction endpoint.</p>
        </div>
        <pre>{JSON.stringify(result ?? {
          apiRoute: '/api/agent-harness/change-board',
          superAdminRoute: '/studio/super-admin/agent-harness',
          targetBoard: targetBoardId,
          changeScope: 'single_board_only',
          stitchStatus: 'blocked_until_director_approval'
        }, null, 2)}</pre>
      </article>
    </section>
  );
}
