import type { Block } from '@/lib/types';

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === 'h') {
          const Tag = (b.lvl <= 2 ? 'h2' : b.lvl === 3 ? 'h3' : 'h4') as 'h2' | 'h3' | 'h4';
          return <Tag key={i}>{b.v}</Tag>;
        }
        if (b.t === 'p') return <p key={i}>{b.v}</p>;
        if (b.t === 'list') {
          return b.ordered
            ? <ol key={i}>{b.v.map((x, j) => <li key={j}>{x}</li>)}</ol>
            : <ul key={i}>{b.v.map((x, j) => <li key={j}>{x}</li>)}</ul>;
        }
        if (b.t === 'table') {
          return (
            <div className="tbl-wrap" key={i}>
              <table className="tbl">
                <tbody>{b.v.map((r, j) => <tr key={j}><th>{r[0]}</th><td>{r[1]}</td></tr>)}</tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
