"""Resolve explicitly labeled answer keys without changing their meaning."""
import re


def normalize_answers(lessons):
    changes = 0
    for lesson in lessons:
        for question in lesson.get('questions', []):
            options = question.get('options', [])
            answer = question.get('answer')
            if not isinstance(answer, str) or not isinstance(options, list) or answer in options:
                continue
            matches = []
            if question.get('type') == 'multiple-choice' and re.fullmatch(r'[A-Da-d]', answer.strip()):
                # Require an explicit label; never guess a letter's meaning by array position.
                pattern = re.compile(r'^' + re.escape(answer.strip()) + r'[.)]\s+', re.IGNORECASE)
                matches = [option for option in options if isinstance(option, str) and pattern.match(option)]
            elif question.get('type') == 'true-false-not-given':
                matches = [option for option in options if isinstance(option, str) and option.strip().casefold() == answer.strip().casefold()]
            if len(matches) == 1:
                question['answer'] = matches[0]
                changes += 1
    return changes
