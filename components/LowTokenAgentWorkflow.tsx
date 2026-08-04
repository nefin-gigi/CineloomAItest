'use client';

import { useMemo, useState } from 'react';

type TokenMode = 'lowest_cost' | 'balanced' | 'director_final_quality';
type Scope = 'single_board_only' | 'local_scene' | 'full_sequence';

const workflowSteps = [
  ['1', 'Select board', 'Pick one panel from the full storyboard.'],
  ['2', 'Keep context small', 'Use target board + short neighbor notes.'],
  ['3', 'Preview patch', 'Ask the agent for JSON patch only.'],
  ['4', 'Approve change', 'Regenerate only the selected board.'],
  ['5', 'Stitch safely', 'Restitch only the affected segment after approval.']
];

const tokenModes: Array<{ id: TokenMode; title: string; text: string; badge: string }> = [
  { id: 'lowest_cost', title: 'Lowest cost', text: 'Best default. Sends only board + two neighbor summaries.', badge: 'Default' },
  { id: 'balanced', title: 'Balanced', text: 'Adds cached scene/style/character context for harder changes.', badge: 'Safe' },
  { id: 'director_final_quality', title: 'Director final', text: 'Uses richer cached context for final approval moments.', badge: 'Premium' }
];

const scopes: Array<{ id: Scope; title: string; text: string }> = [
  { id: 'single_board_only', title: 'This board only', text: 'Change one selected board; keep all other boards unchanged.' },
  { id: 'local_scene', title: 'Small scene segment', text: 'Use only when the note affects a nearby beat.' },
  { id: 'full_sequence', title: 'Full sequence', text: 'Admin-level override. Blocked by default for large boards.' }
];

const locks = [
  ['character', 'Same character'],
  ['location', 'Same location'],
  ['style', 'Same style'],
  ['camera', 'Camera continuity'],
  ['axis', '180° screen direction'],
  ['neighbor_continuity', 'Neighbor boards'],
  ['export_manifest', 'Export manifest']
];

function shortId(index: number) {
  return `board-${String(index).padStart(4, '0')}`;
}

export function LowTokenAgentWorkflow() {
  const [boardIndex, setBoardIndex] = useState(417);
  const [totalBoards, setTotalBoards] = useState(1000);
  const [tokenMode, setTokenMode] = useState<TokenMode>('lowest_cost');
  const [scope, setScope] = useState<Scope>('single_board_only');
  const [prompt, setPrompt] = useState('Make the boy look more surprised and move the camera closer. Keep everything else the same.');
  const [selectedLocks, setSelectedLocks] = useState(locks.map(([id]) => id));
  const [plan, setPlan] = useState<any>(null);
  const [patch, setPatch] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const boardId = useMemo(() => shortId(Math.max(1, Math.min(boardIndex, totalBoards))), [boardIndex, totalBoards]);
  const currentBoardPrompt = 'Medium close-up storyboard panel of the same child in the sunlit playground, ball near his feet, clean cinematic storyboard style.';
  const previousBoardSummary = 'Previous board: ball rolls toward the child from screen left to screen right.';
  const nextBoardSummary = 'Next board: woman enters frame, smiles, and gently returns the ball.';

  function toggleLock(id: string) {
    setSelectedLocks((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }

  async function previewTokenPlan() {
    setBusy(true);
    setPatch(null);
    try {
      const response = await fetch('/api/agent-harness/token-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyboardId: 'storyboard_1000_panel_demo',
          boardId,
          boardIndex,
          totalBoards,
          directorPrompt: prompt,
          currentBoardPrompt,
          previousBoardSummary,
          nextBoardSummary,
          sceneSummary: 'Playground scene. A child notices a ball, receives it from a kind woman, and smiles.',
          styleSummary: 'Clean cinematic storyboard panels, natural emotions, clear blocking.',
          characterSummary: 'Young child, same face, same blue shirt, warm expressive eyes.',
          locationSummary: 'Sunny playground lawn, soft daylight, safe family setting.',
          scope,
          tokenMode
        })
      });
      const data = await response.json();
      setPlan(data.plan ?? data);
    } catch (error) {
      setPlan({ ok: false, error: error instanceof Error ? error.message : 'Could not preview token plan.' });
    } finally {
      setBusy(false);
    }
  }

  async function runBoardPatch(dryRun = false) {
    setBusy(true);
    try {
      const response = await fetch('/api/agent-harness/change-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: 'ws_demo',
          projectId: 'project_playground',
          storyboardId: 'storyboard_1000_panel_demo',
          boardId,
          boardIndex,
          totalBoards,
          directorPrompt: prompt,
          currentBoardPrompt,
          previousBoardSummary,
          nextBoardSummary,
          sceneSummary: 'Playground scene. Child notices a ball, receives it, and smiles.',
          styleSummary: 'Clean cinematic storyboard panels with warm family-safe realism.',
          characterSummary: 'Same child character, same wardrobe, same emotional continuity.',
          locationSummary: 'Sunny playground lawn with consistent spatial geography.',
          locks: selectedLocks,
          scope,
          tokenMode,
          stitchMode: 'block_until_approved',
          dryRun
        })
      });
      const data = await response.json();
      setPatch(data.result ?? data);
      if (data.result?.lowTokenPlan) setPlan(data.result.lowTokenPlan);
    } catch (error) {
      setPatch({ ok: false, error: error instanceof Error ? error.message : 'Could not run board patch.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="lt-agent" aria-label="Lowest-token director agent workflow">
      <div className="lt-agent-hero">
        <div>
          <span className="lt-kicker">Lowest-token AI Harness</span>
          <h2>Change one board without paying for all 1,000 boards.</h2>
          <p>Directors can select one storyboard panel, write a plain-English note, preview the token plan, and apply a JSON patch that keeps every other board locked before dynamic stitching.</p>
        </div>
        <div className="lt-savings-card">
          <span>Estimated savings</span>
          <strong>{plan?.estimatedTokens?.estimatedSavingsPercent ?? 98}%</strong>
          <small>versus sending the full storyboard context</small>
        </div>
      </div>

      <div className="lt-steps" aria-label="Workflow steps">
        {workflowSteps.map(([num, title, text]) => (
          <div key={num}>
            <b>{num}</b>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="lt-grid">
        <article className="lt-panel lt-panel-main">
          <div className="lt-panel-head">
            <span>Step 1</span>
            <h3>Select one board and define the change</h3>
          </div>
          <div className="lt-form-grid">
            <label>
              <span>Board number</span>
              <input type="number" min="1" max="1000" value={boardIndex} onChange={(event) => setBoardIndex(Number(event.target.value))} />
            </label>
            <label>
              <span>Total boards</span>
              <input type="number" min="1" max="1000" value={totalBoards} onChange={(event) => setTotalBoards(Number(event.target.value))} />
            </label>
          </div>
          <div className="lt-board-target">
            <span>Selected target</span>
            <strong>{boardId}</strong>
            <em>Only this board can change.</em>
          </div>
          <label className="lt-textarea">
            <span>Director note</span>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          </label>
        </article>

        <article className="lt-panel">
          <div className="lt-panel-head">
            <span>Step 2</span>
            <h3>Choose the smallest safe scope</h3>
          </div>
          <div className="lt-choice-stack">
            {scopes.map((item) => (
              <button key={item.id} type="button" className={scope === item.id ? 'active' : ''} onClick={() => setScope(item.id)}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="lt-panel">
          <div className="lt-panel-head">
            <span>Step 3</span>
            <h3>Select token mode</h3>
          </div>
          <div className="lt-token-modes">
            {tokenModes.map((item) => (
              <button key={item.id} type="button" className={tokenMode === item.id ? 'active' : ''} onClick={() => setTokenMode(item.id)}>
                <em>{item.badge}</em>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="lt-panel lt-panel-main">
          <div className="lt-panel-head">
            <span>Step 4</span>
            <h3>Continuity locks</h3>
          </div>
          <div className="lt-locks">
            {locks.map(([id, label]) => (
              <button key={id} type="button" className={selectedLocks.includes(id) ? 'active' : ''} onClick={() => toggleLock(id)}>
                {selectedLocks.includes(id) ? '✓' : '+'} {label}
              </button>
            ))}
          </div>
        </article>

        <article className="lt-panel lt-context-pack">
          <div className="lt-panel-head">
            <span>Context sent to AI</span>
            <h3>Small payload, big control</h3>
          </div>
          <ul>
            <li>Target board metadata</li>
            <li>Current board visual prompt</li>
            <li>Previous and next board summaries</li>
            <li>Compressed continuity locks</li>
            <li>Director note</li>
          </ul>
          <div className="lt-blocked">
            <strong>Blocked by default</strong>
            <span>Full storyboard, full screenplay, unchanged board prompts, full render timeline.</span>
          </div>
        </article>

        <article className="lt-panel lt-actions-panel">
          <div className="lt-panel-head">
            <span>Step 5</span>
            <h3>Preview, patch, approve</h3>
          </div>
          <div className="lt-actions">
            <button type="button" disabled={busy} onClick={previewTokenPlan}>Preview token plan</button>
            <button type="button" disabled={busy} onClick={() => runBoardPatch(true)} className="secondary">Dry-run patch</button>
            <button type="button" disabled={busy} onClick={() => runBoardPatch(false)} className="dark">Apply after approval</button>
          </div>
          <p className="lt-note">Dynamic stitching stays blocked until the director approves the changed board.</p>
        </article>
      </div>

      <div className="lt-output-grid">
        <article className="lt-output">
          <h3>Token plan</h3>
          <pre>{JSON.stringify(plan ?? {
            mode: tokenMode,
            scope,
            sends: ['target board', 'two neighbor notes', 'continuity locks', 'director prompt'],
            blocks: ['full 1000-board context', 'full screenplay', 'unchanged prompts'],
            estimatedSavings: 'preview to calculate'
          }, null, 2)}</pre>
        </article>
        <article className="lt-output">
          <h3>Patch result</h3>
          <pre>{JSON.stringify(patch ?? {
            api: '/api/agent-harness/change-board',
            output: 'JSON patch only',
            changedBoards: [boardId],
            unchangedBoards: totalBoards - 1,
            stitchStatus: 'blocked_until_director_approval'
          }, null, 2)}</pre>
        </article>
      </div>
    </section>
  );
}
