import Link from 'next/link';

// Minimal inline-link parser: [label](/path/) -> <Link>. Kept deliberately
// simple (no other markdown) since post content is authored, not user input.
function renderInline(text) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link key={key++} href={match[2]}>
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function Table({ table }) {
  return (
    <div className="table-wrap" style={{ margin: '1.25rem 0' }}>
      <table>
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{renderInline(String(cell))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PostBody({ body }) {
  if (!body) return null;
  const { intro, sections = [], faqs = [], closing } = body;

  return (
    <>
      {intro && <p style={{ fontSize: '1.1rem' }}>{renderInline(intro)}</p>}

      {sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
          {section.table && <Table table={section.table} />}
        </div>
      ))}

      {faqs.length > 0 && (
        <div>
          <h2>Frequently Asked Questions</h2>
          <div className="stack">
            {faqs.map((f) => (
              <div key={f.q} className="card">
                <h3 style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{f.q}</h3>
                <p style={{ marginBottom: 0 }}>{renderInline(f.a)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {closing && <p>{renderInline(closing)}</p>}
    </>
  );
}

export function postFaqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
