"""Editorial usage bands for work and social chunks; not corpus statistics.

5: ubiquitous conversational frames; 4: common daily/social/work use;
3: narrower workplace or social situations; 2: specialist business contexts.
"""
WORK_TOPICS = {
    'Phối hợp hằng ngày': 4,
    'Lịch họp và thời gian': 4,
    'Điều hành cuộc họp': 3,
    'Giải thích và làm rõ': 4,
    'Kế hoạch và công việc': 4,
    'Tiến độ và trở ngại': 4,
    'Ưu tiên và quyết định': 3,
    'Nhóm và làm việc từ xa': 4,
    'Email và tin nhắn công việc': 4,
    'Góp ý và phát triển': 3,
    'Thuyết trình': 3,
    'Khách hàng và nhu cầu': 3,
    'Thương lượng và thỏa thuận': 3,
    'Chi phí và nguồn lực': 2,
    'Tài liệu và báo cáo': 3,
    'Quy trình và chất lượng': 3,
    'Nghề nghiệp và bàn giao': 3,
    'Lãnh đạo và định hướng': 2,
}

CORE = set('''get started
ask for help
lend a hand
take a look
get back to you
stay in touch
work together
find out more
Nice to meet you
My name is
You can call me
I'm from
I grew up in
I live with
I'm new here
This is my first time
How do you spell
How do you pronounce
Where are you from
What do you do
I work as
I work for
What about you
How are you
How have you been
It's good to see you
Long time no see
What's new
How was your weekend
How's it going
How was your day
What happened next
Tell me more
That sounds interesting
What do you think
I see what you mean
What do you mean by
How do you know
I have a question
Can I ask you something
By the way
Keep in touch
How's your family
Would you like to
Do you want to
Are you free
That sounds great
I'd love to
I'm afraid I can't
Maybe next time
What time shall we meet
Where shall we meet
Let me know
I'm on my way
I'm running a little late
I'll be there soon
I'm almost there
Come on in
Make yourself at home
Have a seat
Thanks for coming
It was nice seeing you
I should get going
See you around
Take care of yourself
I'm glad
I'm happy for you
I'm looking forward to
I can't wait to
I'm excited about
I'm proud of
That's a relief
I'm worried about
I'm tired of
I'm confused about
I'm surprised that
I know how you feel
I'm here for you
Take your time
There's no rush
I need a moment
I feel better now
That means a lot to me
I like to
I enjoy
I love
I prefer
I'd rather
I'm not a fan of
I don't mind
It's up to you
I haven't decided yet
I think
I don't think
I believe
I agree
I disagree
I'm not sure
That makes sense
You're right
I could be wrong
As far as I know
In my opinion
I'm sorry
I'm sorry about
I'm sorry for
I didn't mean to
It was my fault
I made a mistake
No need to apologize
Thanks for listening
Thanks for letting me know
Thanks for inviting me
Thanks for your patience
Thanks for understanding
I really appreciate it
I appreciate your help
That's very kind of you
You're very welcome
I'm glad I could help
Happy to help
Could you say that again
Could you speak a little slower
I didn't catch
What does that mean
Could you give me an example
Let me explain
Just to be clear
Do you mean that
What's the word for
Please correct me if I'm wrong
Does that answer your question
Now I understand'''.splitlines())

# These expressions occur in narrower situations or have less common idiomatic wording.
NARROW_SOCIAL = set('''Give everyone my love
I'd better be off
Until next time
Don't let me keep you
You shouldn't have
It was the least I could do
No hard feelings
Let's put it behind us
Let me make it up to you
I couldn't have done it without you
I don't know how to thank you
Am I saying that right
Have I understood you correctly
How can I put this
I don't know the exact word'''.splitlines())


def frequency_for(item):
    if item['chunk'] in CORE:
        return 5
    if item['category'] == 'Work':
        return WORK_TOPICS[item['topic']]
    return 3 if item['chunk'] in NARROW_SOCIAL else 4
