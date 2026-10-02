import SiteLayout from "./SiteLayout";

function ChunkCards({ section }) {
  const labels = [
    "When to use",
    "Pattern",
    "Simple example",
    "Work example · đổi chi tiết cho đúng với bạn",
  ];
  return (
    <>
      <span className="number">{section.label}</span>
      <h2>{section.heading}</h2>
      <p className="instruction">{section.instruction}</p>
      <div className="chunks">
        {section.items.map((item) => (
          <article className="chunk" key={item.saveKey}>
            <small>{item.label}</small>
            <h3>{item.phrase}</h3>
            <p>{item.meaning}</p>
            <details>
              <summary>Cách dùng &amp; ví dụ</summary>
              <dl>
                {item.details.map((text, index) => (
                  <div key={labels[index]}>
                    <dt>{labels[index]}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <label className="choice">
              <input
                type="checkbox"
                data-save={item.saveKey}
                className="chunk-used"
              />{" "}
              Tôi đã tự dùng chunk này khi nói
            </label>
          </article>
        ))}
      </div>
    </>
  );
}

function Assessment({ section }) {
  return (
    <>
      <span className="number">{section.label}</span>
      <h2>{section.heading}</h2>
      {section.questions.map((question, index) => (
        <fieldset className="question" key={index}>
          <legend>{question.prompt}</legend>
          {question.choices.map((choice) => (
            <label className="choice" key={choice.value}>
              <input
                type="radio"
                name={choice.name}
                value={choice.value}
                data-save={choice.saveKey}
              />
              {choice.text}
            </label>
          ))}
        </fieldset>
      ))}
      <button className="hint" data-target={`#${section.prefix}-hint`}>
        Cần gợi ý?
      </button>
      <div id={`${section.prefix}-hint`} className="feedback">
        {section.hint}
      </div>
      <div className="row">
        <button id={`submit-${section.id}`}>Nộp {section.id}</button>
        <span id={`status-${section.id}`}>Chưa hoàn thành</span>
      </div>
      <div
        id={`${section.prefix}-feedback`}
        className="feedback"
        aria-live="polite"
      />
    </>
  );
}

export default function Lesson({ lesson }) {
  return (
    <SiteLayout title={lesson.title} pageType="lesson">
      <main
        className="lesson-main"
        data-day={lesson.day}
        data-content-version={lesson.contentVersion}
        data-comp={lesson.answers.comp}
        data-quiz={lesson.answers.quiz}
      >
        <section className="hero lesson-hero">
          <p className="kicker">{lesson.kicker}</p>
          <h1>
            {lesson.heading}
            {lesson.subtitle && (
              <>
                <br />
                <small>{lesson.subtitle}</small>
              </>
            )}
          </h1>
          <p>{lesson.description}</p>
        </section>
        <div id="mode" className="mode hidden" />
        <div id="lesson-content">
          {lesson.sections.map((section, index) =>
            section.type === "rich" ? (
              // These are trusted, repository-authored lesson fragments, never user input.
              <section
                key={section.id || index}
                id={section.id || undefined}
                className={section.className}
                {...section.attributes}
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            ) : (
              <section
                key={section.id}
                id={section.id}
                className={section.className}
                {...section.attributes}
              >
                {section.type === "chunks" ? (
                  <ChunkCards section={section} />
                ) : (
                  <Assessment section={section} />
                )}
              </section>
            ),
          )}
          <section className="panel complete">
            <h2>Finish Day {lesson.day}</h2>
            <p>{lesson.completionText}</p>
            <button className="primary" id="finish-day" disabled>
              Hoàn thành Day {lesson.day}
            </button>
          </section>
          <nav className="lesson-nav">
            {lesson.navigation.map((link) =>
              link.href ? (
                <a className="btn" key={link.href} href={link.href}>
                  {link.text}
                </a>
              ) : (
                <span className="btn" key={link.text}>
                  {link.text}
                </span>
              ),
            )}
          </nav>
        </div>
      </main>
    </SiteLayout>
  );
}
