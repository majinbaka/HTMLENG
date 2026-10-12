#!/usr/bin/env python3
"""Build the curated Work + social Everyday portion of the chunk library.

Frequency is an editorial teaching priority, not a corpus measurement.
Verb records have three context tails; sentence records have three authored examples.
"""
import json
import re
from pathlib import Path
from work_frequency import frequency_for

DATA=[]

def verbs(topic, frequency, note, rows):
    for line in rows.strip().splitlines():
        parts=line.split('|')
        assert len(parts)==3, line
        chunk,meaning,contexts=parts
        contexts=contexts.split(' / ')
        assert len(contexts)==3, line
        templates=["We need to {} {}.","Could you {} {}?","I'll {} {}."]
        examples=[t.format(chunk,c).replace('  ',' ').replace(' .','.') for t,c in zip(templates,contexts)]
        DATA.append(dict(category='Work',chunk=chunk,explanation=f'{meaning}. {note}',examples=examples,frequency=frequency,topic=topic))

def sentences(topic,frequency,note,rows,category='Everyday'):
    for line in rows.strip().splitlines():
        parts=line.split('|')
        assert len(parts)==5, line
        chunk,meaning,*examples=parts
        DATA.append(dict(category=category,chunk=chunk,explanation=f'{meaning}. {note}',examples=examples,frequency=frequency,topic=topic))

verbs('Phối hợp hằng ngày',5,'Dùng để phối hợp một việc cụ thể với đồng nghiệp.',r'''
get started|bắt đầu làm việc|on the report / after the short break / as soon as the meeting ends
check the details|kiểm tra chi tiết|before sending the offer / in the meeting notes / with the client this afternoon
keep everyone updated|cập nhật tình hình cho mọi người|as the plan changes / during the busy period / after each client call
share an update|chia sẻ thông tin mới về tiến độ|at the morning meeting / with the rest of the team / after the client replies
ask for help|nhờ giúp đỡ|when the workload is too heavy / if the instructions are unclear / with the monthly report
lend a hand|giúp một tay|with the event preparations / with these boxes / while the team is short of people
take a look|xem qua|at the latest draft / at these meeting notes / at the schedule this afternoon
have a quick chat|nói chuyện nhanh|about the next steps / with the new team member / with the client after lunch
get back to you|phản hồi lại cho bạn|with an answer today / about the final dates / as soon as I know more
follow up|liên hệ lại để hỏi hoặc xử lý tiếp|on yesterday's discussion / with the client tomorrow / after the planning meeting
check in|hỏi thăm hoặc cập nhật nhanh tình hình|with the team each morning / with the new colleague / with you later today
stay in touch|giữ liên lạc|during the project / while you work from home / after the event
make a start|bắt tay vào làm|on the meeting notes / on the first draft today / on the plan after lunch
work together|cùng làm việc|on the client proposal / on the team presentation / with the sales team this week
sort things out|sắp xếp hoặc giải quyết cho ổn|before the client arrives / with the event organizer / after speaking to the team
get things ready|chuẩn bị mọi thứ sẵn sàng|for tomorrow's workshop / before the guests arrive / while you welcome the visitors
make a quick call|gọi điện nhanh|to confirm the venue / to the event organizer / to check the meeting time
double-check the time|kiểm tra lại giờ cho chắc|before sending the invitation / with the other office / before booking the room
pass on the message|chuyển lời nhắn|to the whole team / to the project lead / when I see the manager
keep a record|lưu lại thông tin|of each customer request / of the agreed changes / of today's decisions
find out more|tìm hiểu thêm|about the client's needs / before making a decision / at the planning meeting
bring everyone up to date|cập nhật để mọi người nắm tình hình|at the start of the call / on the new schedule / before we discuss the next steps
put things in order|sắp xếp mọi thứ theo trật tự|before the review / in the shared folder / before leaving the office
check with the team|hỏi lại hoặc xác nhận với nhóm|before changing the date / about the new plan / before I reply to the client
finish up|hoàn tất phần đang làm|before the next meeting / by four this afternoon / after the last client call
''')

verbs('Lịch họp và thời gian',5,'Dùng khi đặt lịch, đổi lịch hoặc thu xếp thời gian làm việc.',r'''
set up a meeting|sắp xếp một cuộc họp|with the client / for next Tuesday / after checking everyone's availability
find a suitable time|tìm giờ phù hợp|for the weekly call / for the training session / after checking the calendar
check your availability|kiểm tra thời gian bạn rảnh|before setting the date / for Thursday afternoon / for the next team workshop
send an invitation|gửi lời mời|to everyone on the team / for the review meeting / once the time is confirmed
confirm the meeting|xác nhận cuộc họp|with the client / for ten tomorrow / after speaking to the manager
move the meeting|đổi thời gian cuộc họp|to Friday morning / to a later time / if the client cannot join
cancel the meeting|hủy cuộc họp|because the client is away / if nobody can attend / after informing the team
book a meeting room|đặt phòng họp|for the workshop / for six people / once we agree on a date
allow extra time|dành thêm thời gian dự phòng|for questions / for the client discussion / for the final review
make time|thu xếp thời gian|for the new colleague / for a short discussion / for the team review
block out some time|chặn một khoảng thời gian trong lịch|for focused work / for the planning session / tomorrow afternoon
leave enough time|chừa đủ thời gian|for the discussion / between the two meetings / for people to ask questions
keep to the schedule|bám sát lịch đã định|during the workshop / for the rest of the day / while leading the session
start on time|bắt đầu đúng giờ|tomorrow morning / even if a few people are late / after a quick sound check
end on time|kết thúc đúng giờ|so people can join their next call / today if possible / by keeping the introduction short
run through the agenda|điểm qua các mục họp|at the start of the call / before the guests arrive / with the meeting host
add it to the calendar|thêm việc đó vào lịch|once the date is agreed / with a short description / after confirming the room
leave a gap|chừa một khoảng trống|between the two sessions / in the afternoon schedule / for an informal discussion
suggest another time|đề xuất giờ khác|if Friday is too busy / for the client call / when I reply to the invitation
bring the meeting forward|dời cuộc họp sớm hơn|to Monday / by one day / if everyone is available
push the meeting back|dời cuộc họp muộn hơn|by half an hour / to next Wednesday / if the discussion takes longer
arrange a follow-up meeting|sắp xếp cuộc họp tiếp theo|to review the results / for next month / after the trial period
check the time zone|kiểm tra múi giờ|before joining the call / on the invitation / before confirming the time
give advance notice|báo trước|when changing the schedule / before taking time off / if I cannot attend
send a reminder|gửi lời nhắc|before the workshop / to the invited speakers / the day before the meeting
''')

verbs('Điều hành cuộc họp',5,'Dùng để tổ chức và dẫn dắt phần trao đổi trong cuộc họp.',r'''
open the meeting|mở đầu cuộc họp|with a short introduction / by welcoming the guests / at nine tomorrow
introduce the topic|giới thiệu chủ đề|before showing the figures / in a few simple sentences / after everyone arrives
go through the main points|đi qua các ý chính|before the discussion / from the client brief / in the first ten minutes
stick to the agenda|bám đúng nội dung họp|so we finish on time / during today's call / while leading the discussion
take turns|lần lượt phát biểu hoặc làm việc|when sharing ideas / so everyone can speak / with my colleague during the presentation
invite questions|mời mọi người đặt câu hỏi|after each section / before ending the meeting / at the end of my talk
ask for opinions|xin ý kiến|before choosing a plan / from the quieter team members / once I explain the options
hear everyone out|nghe hết ý kiến của mọi người|before making a decision / during the discussion / before I share my view
stay on topic|giữ cuộc trao đổi đúng chủ đề|during the review / until we agree on the next step / when answering questions
come back to that|quay lại vấn đề đó|after the break / once we finish this point / at the end of the meeting
leave that for later|để việc đó bàn sau|because we need more information / until the manager joins / while we discuss the urgent items
move on to the next point|chuyển sang ý tiếp theo|after a short summary / once everyone agrees / if there are no more questions
keep the discussion focused|giữ cuộc thảo luận tập trung|on the client's needs / on today's decision / by checking the agenda
make room for questions|dành thời gian cho câu hỏi|at the end / after the guest speaker / in the final ten minutes
sum up the discussion|tóm tắt cuộc thảo luận|before we leave / in a few sentences / after hearing the last comment
confirm the next steps|xác nhận các bước tiếp theo|before ending the call / with the project lead / in the follow-up message
assign action items|giao các việc cần thực hiện sau họp|before the meeting ends / to the right people / after we agree on the plan
take meeting notes|ghi chép nội dung họp|during the client call / for colleagues who are away / while you lead the discussion
read out the decisions|đọc các quyết định cho mọi người nghe|before we finish / at the end of the session / so everyone can check them
wrap up the meeting|kết thúc gọn cuộc họp|in the next five minutes / after the final question / with a summary of our decisions
record the key points|ghi lại các điểm chính|from the discussion / in the shared document / while listening to the speaker
pause for a moment|dừng một lát|to check the figures / before moving to the next slide / while the guest joins
make the purpose clear|làm rõ mục đích|at the start of the session / before asking for feedback / in the meeting invitation
limit the discussion|giới hạn cuộc thảo luận|to the main issue / to fifteen minutes / so we have time for questions
close with a summary|kết thúc bằng phần tóm tắt|of the agreed actions / of the main findings / before thanking the guests
''')

verbs('Giải thích và làm rõ',5,'Dùng khi kiểm tra hiểu đúng và giải thích thông tin cho rõ.',r'''
ask a quick question|hỏi nhanh một câu|before we move on / about the new schedule / after the introduction
clarify the main point|làm rõ ý chính|before we decide / for the new team members / with a simple example
explain the reason|giải thích lý do|for the delay / behind the new policy / when I speak to the client
give an example|đưa ra ví dụ|to make the idea clearer / from your recent work / during the training session
put it another way|diễn đạt lại bằng cách khác|so everyone understands / without using technical words / when I explain the plan
check our understanding|kiểm tra xem nhóm hiểu đúng chưa|before starting the task / with the meeting host / at the end of the session
repeat the last part|nhắc lại phần vừa nói cuối cùng|for colleagues who joined late / a little more slowly / when everyone is ready
break it down|chia nội dung thành các phần dễ hiểu|into smaller steps / for the new colleague / using a simple diagram
make it clearer|làm cho điều đó rõ hơn|with a short example / in the next draft / before sending the message
spell out the steps|nói rõ từng bước|in the instructions / for the new assistant / during the training
check what you mean|kiểm tra ý bạn muốn nói|before answering / by asking a follow-up question / about the new deadline
ask for more detail|xin thêm chi tiết|about the request / before preparing the offer / when the client calls back
find the right words|tìm cách diễn đạt phù hợp|for this sensitive message / before giving feedback / when explaining the delay
use plain language|dùng ngôn ngữ dễ hiểu|in the customer guide / during the presentation / when writing the summary
avoid confusion|tránh hiểu nhầm|by confirming the date / with a clear subject line / by explaining who owns each task
check the facts|kiểm tra sự thật hoặc thông tin|before sharing the news / with the person involved / before drawing a conclusion
fill in the gaps|bổ sung thông tin còn thiếu|in the project brief / using the meeting notes / after speaking to the client
provide some context|cung cấp thông tin nền|before showing the figures / for the new team members / at the start of my message
explain the difference|giải thích điểm khác nhau|between the two plans / with a simple example / before we choose an option
make sure we agree|kiểm tra để chắc rằng chúng ta thống nhất|on the deadline / before telling the client / about the next steps
rephrase the question|diễn đạt lại câu hỏi|so it is easier to answer / without using abbreviations / if the speaker looks unsure
check the meaning|kiểm tra ý nghĩa|of the client's comment / of this unfamiliar phrase / before replying
separate the two issues|tách hai vấn đề ra để xem xét|before discussing solutions / in the written summary / so each gets enough attention
walk through an example|giải thích lần lượt một ví dụ|during the workshop / with the new colleague / before explaining the full process
state the question clearly|nêu câu hỏi rõ ràng|at the start of the discussion / in the feedback form / before asking the group to respond
''')

verbs('Kế hoạch và công việc',5,'Dùng khi chia việc, lập kế hoạch và xác định trách nhiệm.',r'''
make a plan|lập kế hoạch|for the coming week / before starting the project / with the team tomorrow
set a clear goal|đặt mục tiêu rõ ràng|for each stage / before the workshop / at the next planning meeting
list the main tasks|liệt kê các việc chính|for the event / in order of importance / before estimating the time
break the work into steps|chia công việc thành các bước|so it feels manageable / for the new team member / when I write the plan
divide the work|chia công việc|between the two teams / fairly among the group / after checking everyone's workload
share the workload|chia sẻ khối lượng công việc|during the busy season / with the new colleague / while the manager is away
agree on a deadline|thống nhất hạn hoàn thành|before accepting the task / with the project lead / during the client call
set realistic expectations|đặt kỳ vọng thực tế|for the first month / with the client / before the work begins
define the scope|xác định phạm vi công việc|before estimating the cost / for the first phase / with the client this week
identify the next step|xác định bước tiếp theo|after reviewing the results / for each open issue / at the end of the discussion
prepare a checklist|chuẩn bị danh sách kiểm tra|for the workshop / before handing over the work / to help the new assistant
estimate the effort|ước lượng công sức cần bỏ ra|before making a promise / for each main task / after reviewing the requirements
agree on priorities|thống nhất thứ tự ưu tiên|for the week / with the whole team / before assigning new work
assign a task|giao một công việc|to each team member / with a clear deadline / after explaining the goal
take responsibility|nhận trách nhiệm|for the client presentation / for the next review / for organizing the workshop
pick up a task|nhận làm một công việc|from the shared list / while your colleague is away / once I finish the report
hand over the work|bàn giao công việc|before going on leave / with clear notes / after checking the final details
review the plan|xem xét lại kế hoạch|after the client meeting / with the team lead / before confirming the date
adjust the timeline|điều chỉnh mốc thời gian|because the brief has changed / to allow more review time / after speaking to the team
plan ahead|lên kế hoạch từ sớm|for the busy season / for next month's events / before the holiday period
allow for changes|tính đến khả năng thay đổi|when setting the budget / in the event schedule / while planning the next phase
identify the owner|xác định người phụ trách|for each action item / before closing the meeting / in the project checklist
check the workload|kiểm tra khối lượng công việc|before assigning more tasks / across the whole team / at the weekly review
agree on the approach|thống nhất cách làm|before work starts / with the other department / during the planning session
keep the plan simple|giữ kế hoạch đơn giản|for the first trial / so everyone can follow it / when writing the proposal
''')

verbs('Tiến độ và trở ngại',5,'Dùng để báo tiến độ và giải quyết điều đang cản trở công việc.',r'''
make progress|đạt tiến triển|on the new proposal / with the planning work / during the quieter afternoon
track progress|theo dõi tiến độ|against the weekly goals / in the shared task list / during the first month
give a status update|báo cáo tình trạng công việc|at the morning meeting / before the manager leaves / after checking with the team
finish the first draft|hoàn thành bản nháp đầu tiên|by Thursday / before the review call / after collecting the figures
complete the final checks|hoàn thành các bước kiểm tra cuối|before sending the report / with the event team / once the changes are ready
stay on track|giữ đúng hướng và tiến độ|during the busy week / by focusing on the main goal / with help from the team
catch up on work|làm bù phần công việc đang chậm|after the holiday / before taking another task / during the free hour tomorrow
get back on track|trở lại đúng tiến độ|after the delay / with support from the other team / once the missing details arrive
flag an issue|báo một vấn đề cần chú ý|before it causes a delay / in the weekly update / when I speak to the manager
raise a concern|nêu một điều lo ngại|about the tight schedule / during the planning meeting / before we accept the offer
remove an obstacle|gỡ một trở ngại|that is slowing the team down / before assigning more work / by speaking to the right person
find a solution|tìm giải pháp|to the scheduling problem / with the people involved / after reviewing the options
ask for more time|xin thêm thời gian|to finish the report / if the brief changes / before the deadline gets too close
explain the delay|giải thích việc chậm trễ|to the client / in the status message / during the afternoon call
revise the deadline|điều chỉnh hạn hoàn thành|after the scope changes / with the client's agreement / if the review takes longer
report a problem|báo cáo một vấn đề|as soon as it appears / to the person in charge / with the relevant details
keep an eye on progress|để ý theo dõi tiến độ|during the first week / while the team lead is away / until the project is complete
check what is missing|kiểm tra xem còn thiếu gì|before sending the package / from the client brief / in the handover notes
update the task list|cập nhật danh sách công việc|after the meeting / with the new deadlines / before leaving today
mark the task as complete|đánh dấu việc đã hoàn thành|after the final review / when the manager approves it / once I send the report
follow through|làm đến cùng điều đã cam kết|on the agreed actions / on your promise to the client / until the work is finished
keep the client informed|báo tình hình cho khách hàng|if the schedule changes / during the final stage / after speaking to the team
get the work done|hoàn thành công việc|before the event / with the available resources / by asking the team for help
check for delays|kiểm tra xem có chậm trễ không|before confirming the date / across the active tasks / at the end of the day
share the latest figures|chia sẻ số liệu mới nhất|before the review meeting / with the planning team / after checking them carefully
''')

verbs('Ưu tiên và quyết định',4,'Dùng khi cân nhắc lựa chọn và quyết định việc nào cần làm trước.',r'''
focus on the main goal|tập trung vào mục tiêu chính|during the discussion / when reviewing the options / while preparing the plan
put this first|ưu tiên việc này trước|because the deadline is close / on tomorrow's task list / until the client gets an answer
deal with the urgent tasks|xử lý các việc gấp|before the meeting / while the manager is away / at the start of the day
leave that until tomorrow|để việc đó đến ngày mai|if it is not urgent / so we can finish this report / after informing the team
weigh the options|cân nhắc các lựa chọn|before accepting the offer / with the rest of the team / after the client call
compare the alternatives|so sánh các phương án khác|before choosing a venue / using the same criteria / in the next planning session
make a decision|đưa ra quyết định|by the end of the week / after reviewing the costs / once the team has shared its views
reach an agreement|đạt được sự thống nhất|on the main terms / before confirming the order / during tomorrow's discussion
choose the best option|chọn phương án phù hợp nhất|for the team / based on the available information / after checking the budget
consider the impact|xem xét ảnh hưởng|on the other departments / before changing the schedule / when reviewing the proposal
look at the bigger picture|nhìn vào bức tranh tổng thể|before cutting the budget / during the strategy meeting / when comparing the options
think it through|suy nghĩ kỹ từ đầu đến cuối|before making a promise / with the project lead / before giving my answer
keep our options open|giữ lại các lựa chọn|until the client replies / for another few days / while gathering more information
take the lead|chủ động dẫn dắt|on the planning work / during the client meeting / for the next phase
make a trade-off|chấp nhận đánh đổi|between cost and speed / after explaining the options / if we cannot meet both goals
set a limit|đặt giới hạn|on the event budget / for the length of the discussion / before we invite more guests
pick a starting point|chọn điểm bắt đầu|for the improvement plan / that the whole team understands / during the workshop
agree on the criteria|thống nhất tiêu chí|before comparing the offers / with the hiring team / at the beginning of the review
base the decision on facts|dựa quyết định vào thông tin thực tế|from the latest report / when choosing the next step / after checking the figures
avoid rushing the decision|tránh quyết định vội vàng|when the details are unclear / until everyone has had a say / by asking for another day
get approval|xin được phê duyệt|before confirming the booking / from the department head / once the proposal is ready
review the consequences|xem xét các hệ quả|before changing the policy / with the people affected / during the final discussion
put the decision in writing|ghi quyết định bằng văn bản|after the meeting / so everyone can refer to it / before sending the final plan
agree on a compromise|thống nhất một phương án dung hòa|that works for both teams / before the deadline / after hearing both sides
revisit the decision|xem xét lại quyết định|if the situation changes / after the trial period / when we have more information
''')

verbs('Nhóm và làm việc từ xa',4,'Dùng để hợp tác với đồng nghiệp tại văn phòng hoặc từ xa.',r'''
support each other|hỗ trợ lẫn nhau|during the busy period / when the work gets difficult / by sharing useful notes
share ideas|chia sẻ ý tưởng|during the workshop / with the planning group / at the next team meeting
listen carefully|lắng nghe kỹ|to the client's needs / before offering a solution / during the feedback session
respect different opinions|tôn trọng các ý kiến khác nhau|when making a team decision / during the group discussion / while leading the workshop
build trust|xây dựng lòng tin|by keeping our promises / with the new team / through regular honest updates
keep communication open|duy trì việc trao đổi cởi mở|throughout the project / between the two departments / during the period of change
work across teams|làm việc với nhiều nhóm|on the event plan / to solve the scheduling problem / during the next phase
ask for input|xin đóng góp ý kiến|before writing the final plan / from the people doing the work / during the weekly call
share the credit|chia sẻ sự ghi nhận|with everyone who helped / when presenting the results / in my update to the manager
offer support|đề nghị hỗ trợ|to colleagues who are overloaded / during the busy week / while the new person settles in
cover for a colleague|làm thay cho đồng nghiệp|during their leave / at tomorrow's meeting / while they attend training
join the call|tham gia cuộc gọi|a few minutes early / from a quiet room / after finishing this task
turn on the microphone|bật micrô|before introducing ourselves / when you are ready to speak / to answer the next question
turn off the microphone|tắt micrô|when there is background noise / while the speaker is talking / after asking my question
share the screen|chia sẻ màn hình|to show the schedule / during your presentation / when we reach the figures
check the sound|kiểm tra âm thanh|before the call begins / with the meeting host / while everyone joins
switch on the camera|bật camera|for the introductions / if the connection allows it / at the start of the interview
send the meeting link|gửi đường dẫn cuộc họp|with the invitation / to our guest speaker / before the morning call
use the chat|dùng ô trò chuyện|for short questions / to share the document link / while the speaker is presenting
raise a hand|giơ tay xin phát biểu|before asking a question / when you want to add something / after the speaker finishes
record the session|ghi hình hoặc ghi âm buổi làm việc|with everyone's permission / for colleagues who cannot attend / if the host agrees
share the recording|chia sẻ bản ghi buổi làm việc|with the invited team / after checking permission / when the session has finished
stay connected|giữ kết nối với mọi người|while working remotely / through regular team calls / during the project
check in regularly|hỏi thăm hoặc cập nhật đều đặn|with remote colleagues / during the first month / while the new process is being tried
make everyone feel included|giúp mọi người cảm thấy được tham gia|during the group call / when planning the team event / by asking for different views
''')

verbs('Email và tin nhắn công việc',5,'Dùng khi viết, gửi và xử lý tin nhắn công việc.',r'''
reply to the email|trả lời email|before the end of the day / with the confirmed dates / after checking the details
send a quick message|gửi một tin nhắn ngắn|to confirm the time / when you arrive / after the client meeting
write a clear subject line|viết tiêu đề email rõ ràng|for the announcement / before sending the invitation / so people can find the message
attach the document|đính kèm tài liệu|to the follow-up email / before sending the proposal / when I reply to the client
forward the email|chuyển tiếp email|to the person in charge / with a short explanation / once I have permission
copy in the manager|thêm quản lý vào người nhận email|when confirming the decision / on the next update / so she can follow the discussion
keep the message brief|giữ tin nhắn ngắn gọn|so the request is clear / when writing the reminder / in my reply to the team
include the key details|đưa vào các chi tiết quan trọng|in the invitation / when explaining the change / in the message to the client
check the attachment|kiểm tra tệp đính kèm|before sending the email / to make sure it is the latest version / before replying
confirm receipt|xác nhận đã nhận|of the signed form / by replying to the sender / when the documents arrive
acknowledge the message|báo rằng đã nhận và ghi nhận tin nhắn|even if the answer is not ready / before leaving today / as soon as I see it
write a follow-up email|viết email trao đổi tiếp|after the client call / to confirm the agreed actions / tomorrow morning
send the final version|gửi bản cuối cùng|after the review / to everyone attending the meeting / once the manager approves it
check the recipients|kiểm tra danh sách người nhận|before sending the report / carefully on this private message / before I click send
add a short note|thêm lời ghi chú ngắn|to explain the attachment / when forwarding the invitation / at the top of the message
make the request clear|nêu yêu cầu rõ ràng|in the first paragraph / when writing to the other team / before sending the email
ask for a reply|đề nghị người nhận trả lời|by Wednesday afternoon / when confirming attendance / in the final line
include a deadline|ghi kèm hạn trả lời hoặc hoàn thành|in the request / so the team can plan / when sending the form
proofread the email|đọc soát lỗi email|before sending it / for names and dates / after finishing the draft
correct a mistake|sửa một lỗi|in the earlier message / before forwarding the document / as soon as I notice it
send a polite reminder|gửi lời nhắc lịch sự|about the missing form / to people who have not replied / a day before the deadline
thank the sender|cảm ơn người gửi|for the helpful information / when confirming receipt / in my reply
explain the attachment|giải thích nội dung tệp đính kèm|in the email body / for people seeing it for the first time / with a short introduction
save the conversation|lưu lại cuộc trao đổi|for future reference / in the project folder / after the decision is confirmed
update the contact list|cập nhật danh sách liên hệ|before sending the announcement / with the new team members / after checking the addresses
''')

verbs('Góp ý và phát triển',4,'Dùng để trao đổi nhận xét và cải thiện cách làm việc.',r'''
give feedback|đưa ra nhận xét góp ý|on the first draft / after the presentation / in a private conversation
ask for feedback|xin nhận xét góp ý|after trying the new approach / from the people involved / at the next review
accept feedback|tiếp nhận góp ý|with an open mind / before explaining your decision / as a chance to improve
point out a strength|chỉ ra một điểm mạnh|before discussing changes / in the colleague's presentation / during the review
suggest an improvement|đề xuất một điểm cải thiện|to the meeting format / after reviewing the draft / when I speak to the team
be specific|nói hoặc làm cụ thể|when explaining the problem / about the change you want / in my feedback to the writer
focus on the work|tập trung vào công việc đang được nhận xét|when giving feedback / instead of making personal comments / during the review
explain the impact|giải thích ảnh hưởng|of the missed deadline / with a concrete example / when discussing the change
recognize good work|ghi nhận việc làm tốt|during the team meeting / when a colleague helps the group / in the weekly update
say what went well|nói điều đã diễn ra tốt|before discussing problems / at the end of the workshop / during the team review
learn from mistakes|rút kinh nghiệm từ sai sót|after the event / without blaming each other / when reviewing the results
try a different approach|thử cách làm khác|if the first plan does not work / for the next client meeting / after hearing your feedback
put feedback into practice|áp dụng góp ý vào thực tế|in the next draft / during the next presentation / when preparing the new report
set a learning goal|đặt mục tiêu học hỏi|for the next month / with your manager / before choosing a course
build confidence|tăng sự tự tin|through regular practice / by taking on a small task / as I get more experience
improve a skill|cải thiện một kỹ năng|through weekly practice / that helps with your current role / with support from a colleague
ask for guidance|xin hướng dẫn|when the task is unfamiliar / from an experienced colleague / before handling the new request
learn by doing|học thông qua thực hành|during the training period / with someone nearby to help / as I take on the new role
reflect on the experience|suy ngẫm để rút kinh nghiệm|after the presentation / before setting the next goal / during the weekly review
track improvement|theo dõi sự tiến bộ|over the next month / using a few clear examples / after each practice session
share what we learned|chia sẻ điều nhóm đã học được|at the review meeting / with the other department / in the project summary
ask a follow-up question|hỏi tiếp để hiểu sâu hơn|after receiving feedback / if the suggestion is unclear / during the review
make a small change|thực hiện một thay đổi nhỏ|to the opening slide / based on the feedback / before the next meeting
review the results|xem lại kết quả|after the trial period / with the team / before suggesting another change
celebrate progress|ghi nhận và vui với sự tiến bộ|at the end of the month / with the people who helped / during the team review
''')

verbs('Thuyết trình',4,'Dùng để chuẩn bị và trình bày ý tưởng trước một nhóm người.',r'''
prepare a presentation|chuẩn bị bài thuyết trình|for the client / about this month's results / before the team review
introduce ourselves|giới thiệu về bản thân và nhóm|before starting the talk / to the visiting team / at the opening session
outline the main idea|nêu khái quát ý chính|on the first slide / before giving the details / at the start of my talk
keep the introduction short|giữ phần mở đầu ngắn gọn|to allow time for questions / during tomorrow's talk / so we can focus on the results
explain the purpose|giải thích mục đích|of the presentation / before showing the chart / in the opening paragraph
show the key figures|trình bày các số liệu chính|on a simple slide / before discussing the reasons / during the monthly review
highlight the main finding|nhấn mạnh phát hiện chính|at the start of the summary / from the customer survey / before discussing the details
use a simple chart|dùng biểu đồ đơn giản|to compare the results / on the second slide / when explaining the trend
explain the trend|giải thích xu hướng|in this year's figures / without too much detail / after showing the chart
compare the results|so sánh các kết quả|from the two trials / with last month's figures / during the review meeting
pause between points|ngừng một nhịp giữa các ý|so the audience can follow / during the practice run / when presenting the results
speak more slowly|nói chậm hơn|when explaining the figures / during the introduction / if the audience looks confused
make eye contact|giao tiếp bằng mắt|with different people in the room / while explaining your idea / during the opening remarks
use a clear structure|dùng cấu trúc trình bày rõ ràng|for the talk / so the audience can follow / when organizing the slides
support the argument|đưa bằng chứng hỗ trợ lập luận|with clear examples / using the latest figures / before making a recommendation
explain the benefits|giải thích lợi ích|of the new approach / from the customer's point of view / in the next section
mention the limitations|nêu những hạn chế|of the survey / before making a strong claim / when presenting the findings
prepare for questions|chuẩn bị để trả lời câu hỏi|before the client meeting / about the costs and timing / by reviewing the main figures
rehearse the presentation|tập dượt bài thuyết trình|before the event / with a colleague / tomorrow afternoon
check the slide order|kiểm tra thứ tự trang trình chiếu|before the rehearsal / against the outline / once the edits are finished
cut unnecessary detail|lược bỏ chi tiết không cần thiết|from the opening slides / to keep the talk short / during the final review
summarize the key message|tóm tắt thông điệp chính|on the last slide / in one sentence / before taking questions
thank the audience|cảm ơn người nghe|at the end of the talk / for their useful questions / before closing the session
invite further discussion|mời trao đổi thêm|after the presentation / about the proposed changes / at the end of the workshop
share the slides|chia sẻ tài liệu trình chiếu|after the meeting / with people who could not attend / once the figures are approved
''')

verbs('Khách hàng và nhu cầu',4,'Dùng khi tìm hiểu nhu cầu và trao đổi với khách hàng.',r'''
understand the client's needs|hiểu nhu cầu của khách hàng|before preparing a proposal / by asking open questions / during the first meeting
listen to the customer|lắng nghe khách hàng|before offering an answer / without interrupting / during tomorrow's call
ask about their goals|hỏi về mục tiêu của họ|at the first meeting / before discussing prices / when I meet the client
confirm the requirements|xác nhận các yêu cầu|before starting the work / in a short written summary / after the planning call
manage expectations|giúp các bên có kỳ vọng phù hợp|from the beginning / by explaining the timeline / during the first client meeting
explain what is included|giải thích những gì được bao gồm|in the service / before confirming the order / when discussing the offer
check the client's budget|hỏi hoặc kiểm tra ngân sách khách hàng|before suggesting options / during the first call / before preparing a detailed offer
offer a clear solution|đưa ra giải pháp rõ ràng|to the customer's problem / after listening to the request / in the follow-up message
answer the main question|trả lời câu hỏi chính|before adding more detail / in the first paragraph / when the customer calls back
handle a complaint|xử lý lời phàn nàn|calmly and fairly / with support from the manager / according to our agreed process
apologize for the inconvenience|xin lỗi vì sự bất tiện|in the reply / before explaining the next step / when I speak to the customer
look into the matter|kiểm tra để hiểu rõ vụ việc|before giving an answer / with the team involved / as soon as the details arrive
keep a promise|giữ lời hứa|even during a busy week / by replying before Friday / to the client about the update
set up a trial|sắp xếp một đợt dùng thử|before the full order / for a small group / after agreeing on the goals
ask about the experience|hỏi về trải nghiệm|after the first week / when you contact the client / during the review call
collect customer feedback|thu thập góp ý của khách hàng|after the event / through a short form / at the end of the trial
build a good relationship|xây dựng quan hệ tốt|with the new client / through regular communication / by keeping our commitments
check customer satisfaction|kiểm tra mức hài lòng của khách hàng|after the issue is resolved / during the follow-up call / at the end of the project
respond to a request|phản hồi một yêu cầu|within the agreed time / with the relevant information / after checking the details
explain the next step|giải thích bước tiếp theo|before ending the call / in simple terms / after confirming the request
confirm the contact person|xác nhận người liên hệ chính|before sending the proposal / for the next phase / when I call the client
keep a professional tone|giữ giọng điệu chuyên nghiệp|when handling complaints / in the reply / even if the conversation is difficult
resolve the misunderstanding|giải quyết sự hiểu nhầm|before discussing prices / with a clear explanation / during the next client call
follow the agreed process|làm theo quy trình đã thống nhất|when handling the request / for every new client / while the manager is away
close the conversation politely|kết thúc cuộc trao đổi lịch sự|after confirming the next steps / when the customer has no more questions / by thanking the client for their time
''')

verbs('Thương lượng và thỏa thuận',3,'Dùng khi trao đổi điều kiện và tìm phương án hai bên chấp nhận.',r'''
discuss the terms|thảo luận các điều kiện|before signing the agreement / with the client's representative / at tomorrow's meeting
ask for a quote|xin báo giá|from two different suppliers / before confirming the budget / for the event materials
make an offer|đưa ra đề nghị|after checking the costs / that matches the client's budget / once the manager approves it
explain the price|giải thích mức giá|in the proposal / with a simple cost breakdown / when the client asks
ask for a discount|xin giảm giá|on a larger order / when discussing the renewal / if we book several sessions
negotiate the rate|thương lượng mức phí|before confirming the work / with the service provider / after comparing the offers
agree on payment terms|thống nhất điều kiện thanh toán|before starting the project / with the finance team / during the final discussion
set a fair price|đặt mức giá hợp lý|for the extra work / after checking the market / when preparing the offer
explain the value|giải thích giá trị nhận được|of the service / before discussing a discount / in the proposal
ask for more flexibility|xin thêm sự linh hoạt|on the payment date / when reviewing the schedule / before accepting the terms
meet halfway|mỗi bên nhượng bộ một phần|on the final price / to reach an agreement / if the other side is willing
make a counteroffer|đưa ra đề nghị đối ứng|after reviewing the first offer / with clear reasons / once I speak to the manager
find common ground|tìm điểm chung|before discussing the differences / with the other team / by focusing on shared goals
clarify the conditions|làm rõ các điều kiện|before accepting the offer / in the written agreement / during the next call
agree on the final price|thống nhất giá cuối cùng|before sending the order / with the supplier / after checking the changes
ask for written confirmation|xin xác nhận bằng văn bản|of the agreed terms / before paying the deposit / when the date is settled
review the agreement|xem xét lại thỏa thuận|before signing it / with the person responsible / after the new terms arrive
sign the agreement|ký thỏa thuận|after the final review / once both sides agree / when the approved copy arrives
confirm the order|xác nhận đơn đặt|after checking the quantity / with the supplier / once the budget is approved
renew the contract|gia hạn hợp đồng|before it expires / if the terms still work / after reviewing the service
request a change|yêu cầu điều chỉnh|to the payment schedule / before signing the agreement / if the delivery date is unsuitable
leave room for negotiation|chừa khả năng thương lượng|in the first offer / when discussing the deadline / while preparing the proposal
protect the relationship|giữ gìn mối quan hệ|during a difficult negotiation / by keeping the discussion respectful / even if we cannot agree today
confirm both sides agree|xác nhận cả hai bên thống nhất|before writing the final terms / at the end of the call / before arranging the next step
bring the discussion to a close|kết thúc cuộc trao đổi|after confirming the terms / once the main points are settled / with a short summary
''')

verbs('Chi phí và nguồn lực',3,'Dùng khi theo dõi chi phí và chuẩn bị nguồn lực cho công việc.',r'''
prepare a budget|lập ngân sách|for the team event / before requesting approval / after gathering the cost estimates
check the costs|kiểm tra chi phí|before choosing an option / with the event organizer / when the quote arrives
stay within budget|giữ chi tiêu trong ngân sách|during the next phase / when choosing a venue / by cutting optional extras
compare prices|so sánh giá|before placing an order / from several suppliers / when reviewing the offers
keep costs down|giữ chi phí ở mức thấp|without reducing quality / during the trial period / by using the existing materials
track expenses|theo dõi các khoản chi|throughout the project / in the shared sheet / after every event
save the receipts|giữ lại hóa đơn thanh toán|for the finance team / after buying the materials / in the project folder
submit an expense claim|nộp yêu cầu hoàn chi phí|after the business trip / with the original receipts / before the monthly deadline
check the invoice|kiểm tra hóa đơn|against the agreed price / before approving payment / when the supplier sends it
approve the payment|phê duyệt khoản thanh toán|after checking the invoice / before the due date / once the work is accepted
request a purchase|đề nghị mua sắm|through the normal process / with a clear reason / after checking the budget
order the supplies|đặt mua vật dụng cần thiết|before the workshop / from the approved supplier / once the quantity is confirmed
check the quantity|kiểm tra số lượng|before confirming the order / against the request / when the supplies arrive
reduce unnecessary spending|giảm chi tiêu không cần thiết|during the next quarter / by reviewing regular costs / when preparing the budget
estimate the total cost|ước tính tổng chi phí|before asking for approval / including the extra fees / after speaking to the supplier
allow for extra costs|dự trù chi phí phát sinh|in the event budget / when comparing the options / before confirming the plan
explain the cost increase|giải thích việc tăng chi phí|to the project lead / in the revised proposal / during the budget review
check the payment date|kiểm tra ngày thanh toán|before contacting the supplier / on the invoice / with the finance team
request a refund|yêu cầu hoàn tiền|for the cancelled booking / with the order details / after checking the terms
record the purchase|ghi lại giao dịch mua|in the expense list / with the receipt number / as soon as the order is confirmed
use existing resources|sử dụng nguồn lực hiện có|before buying more materials / for the first workshop / when planning the pilot
allocate enough time|phân bổ đủ thời gian|for the review / to each main task / before agreeing on the deadline
check resource availability|kiểm tra nguồn lực có sẵn hay không|before setting the date / with the other teams / when planning the next phase
get a cost estimate|xin một ước tính chi phí|before making a decision / from the event organizer / for the additional work
review the spending|xem lại các khoản chi|at the end of the month / against the original budget / before approving the next phase
''')

verbs('Tài liệu và báo cáo',4,'Dùng để chuẩn bị, kiểm tra và quản lý tài liệu công việc.',r'''
write a summary|viết bản tóm tắt|of the meeting / for the department head / after reading the report
prepare a report|chuẩn bị báo cáo|on this month's activities / for the client review / once the figures are ready
collect the information|thu thập thông tin|before writing the brief / from the team leads / during the first week
check the source|kiểm tra nguồn thông tin|before using the figures / for this claim / when reviewing the report
organize the notes|sắp xếp các ghi chú|by topic / before sharing them / after the interview
update the document|cập nhật tài liệu|with the agreed changes / before the next review / once the dates are confirmed
save a copy|lưu một bản sao|for future reference / before making major changes / in the project folder
use the latest version|dùng phiên bản mới nhất|for the client meeting / when checking the figures / in my presentation
review the draft|xem xét bản nháp|before sharing it widely / with the main writer / this afternoon
check for errors|kiểm tra lỗi|in the final report / before sending the proposal / after adding the new figures
add the missing details|bổ sung chi tiết còn thiếu|to the client brief / before the review meeting / when the team sends its notes
remove outdated information|loại bỏ thông tin đã cũ|from the introduction / before sharing the guide / during the monthly review
keep the format consistent|giữ định dạng thống nhất|across the whole document / with the other reports / when adding the new section
include a short conclusion|thêm phần kết luận ngắn|at the end of the report / after the main findings / when preparing the final draft
highlight the changes|đánh dấu các điểm đã thay đổi|for the reviewer / in the updated proposal / before sending the new version
check the names and dates|kiểm tra tên và ngày tháng|before publishing the announcement / in the invitation / during the final review
keep the records organized|giữ hồ sơ được sắp xếp ngăn nắp|throughout the project / by using clear folder names / before handing over the work
fill in the form|điền biểu mẫu|before the training session / with the requested details / after checking the instructions
sign the form|ký vào biểu mẫu|after checking the information / before returning it / once the manager approves it
file the document|lưu hồ sơ tài liệu|in the right folder / after receiving the signed copy / before leaving today
prepare a handover note|chuẩn bị ghi chú bàn giao|before taking leave / for the incoming colleague / after listing the open tasks
write down the decision|ghi lại quyết định|while it is still clear / in the meeting notes / before we discuss the next point
add a reference|thêm nguồn tham khảo|for the figures / when using information from another report / before sharing the draft
check the totals|kiểm tra các tổng số|before submitting the report / against the source figures / during the final review
make the report easy to scan|làm báo cáo dễ đọc lướt|by using clear headings / before sending it to the manager / with short sections and bullet points
''')

verbs('Quy trình và chất lượng',3,'Dùng để làm rõ cách làm và cải thiện chất lượng công việc.',r'''
follow the instructions|làm theo hướng dẫn|when completing the form / during the trial / while learning the new process
check the requirements|kiểm tra các yêu cầu|before starting the task / against the final result / when reviewing the request
agree on a standard|thống nhất một tiêu chuẩn|for the monthly report / before reviewing the samples / with the other team leads
check the quality|kiểm tra chất lượng|before sending the materials / using the agreed checklist / after the final changes
review the process|xem lại quy trình|after the trial period / with the people who use it / during the improvement meeting
remove an unnecessary step|bỏ một bước không cần thiết|from the approval process / after checking with the team / if it does not add value
simplify the process|đơn giản hóa quy trình|for new team members / without missing important checks / after reviewing the feedback
reduce repeated work|giảm việc làm lặp lại không cần thiết|by sharing clear notes / across the two teams / when redesigning the process
create a clear checklist|tạo danh sách kiểm tra rõ ràng|for the final review / with the main steps / before the next event
identify the cause|xác định nguyên nhân|of the repeated delay / before suggesting a solution / after speaking to the people involved
prevent the same mistake|ngăn lỗi tương tự lặp lại|by improving the instructions / in the next round of work / with a simple final check
check each step|kiểm tra từng bước|before approving the process / against the guide / during the practice run
ask the right person|hỏi đúng người phụ trách|when the instructions are unclear / before changing the process / to confirm the rule
follow the policy|làm theo quy định|when handling expenses / before approving the request / throughout the hiring process
explain the procedure|giải thích trình tự thực hiện|to the new colleague / in simple steps / during the training session
keep a clear record|giữ hồ sơ ghi chép rõ ràng|of each approval / while handling the request / so the next person can follow the work
review the outcome|xem xét kết quả đạt được|after the first month / against the original goal / at the next team meeting
identify a pattern|nhận ra một quy luật lặp lại|in the customer comments / by comparing recent reports / after gathering more examples
check for consistency|kiểm tra tính nhất quán|across the reports / when reviewing the samples / before sending the final pack
ask for a second opinion|xin ý kiến thêm từ người khác|before changing the process / on this difficult case / if the result seems unusual
make the handover smoother|giúp việc bàn giao trôi chảy hơn|with a clear checklist / between the two shifts / by preparing the notes early
reduce the waiting time|giảm thời gian chờ|for approval / by agreeing on a response time / after discussing the delay
keep a backup plan|chuẩn bị sẵn phương án dự phòng|for the event / in case the venue changes / while confirming the main arrangements
check the final outcome|kiểm tra kết quả cuối cùng|against the client's request / before closing the task / after all the changes are made
review what worked|xem lại điều đã có hiệu quả|after the workshop / with the whole team / before planning the next event
''')

verbs('Nghề nghiệp và bàn giao',4,'Dùng trong tuyển dụng, nhận việc, nghỉ phép và bàn giao công việc.',r'''
apply for a role|ứng tuyển một vị trí|that matches our experience / through the company website / after updating my CV
update a CV|cập nhật sơ yếu lý lịch nghề nghiệp|before sending an application / with recent experience / before the recruitment event
prepare for an interview|chuẩn bị cho phỏng vấn|by reviewing the role / with examples from your work / over the weekend
explain our experience|trình bày kinh nghiệm của nhóm hoặc của mình|with a relevant example / during the client introduction / when discussing the new role
ask about the role|hỏi về vị trí công việc|during the interview / before accepting the offer / when I speak to the recruiter
check the job description|xem bản mô tả công việc|before applying / for the main responsibilities / before preparing my questions
welcome a new colleague|chào đón đồng nghiệp mới|on their first day / during the team meeting / by arranging a short introduction
show someone around|dẫn ai đó đi tham quan|on their first day / before the workshop begins / when the visitors arrive
explain the team structure|giải thích cơ cấu nhóm|during the introduction / to the new colleague / on their first morning
introduce the main contacts|giới thiệu những người liên hệ chính|during the handover / before the first client call / at the welcome meeting
arrange training|sắp xếp đào tạo|for the new starters / before the busy period / after checking the team's needs
set up a handover|sắp xếp buổi bàn giao|before the role changes / with the outgoing colleague / once the start date is confirmed
request time off|xin nghỉ phép|well before the holiday period / through the normal process / after checking the team schedule
check the leave balance|kiểm tra số ngày phép còn lại|before planning time off / in the staff record / before submitting the request
arrange cover|sắp xếp người làm thay|while a colleague is away / for next week's event / before going on leave
prepare before leaving|chuẩn bị trước khi nghỉ hoặc rời đi|so the team can continue / by updating the handover notes / at the end of the week
set an out-of-office reply|đặt thư trả lời tự động khi vắng mặt|before taking leave / with the return date / on my last working afternoon
share an emergency contact|chia sẻ người liên hệ khi có việc gấp|with the person covering the work / if the team needs one / before leaving for the trip
return to work|trở lại làm việc|after the holiday / when you feel ready / on Monday morning
catch up with the team|trao đổi để nắm lại tình hình nhóm|after some time away / before starting the new task / during the morning meeting
discuss career goals|trao đổi mục tiêu nghề nghiệp|during the review / with your manager / at my next one-to-one meeting
ask for more responsibility|xin nhận thêm trách nhiệm|when the current work is under control / during the career discussion / after finishing the training
prepare a work sample|chuẩn bị mẫu sản phẩm công việc|for the interview / that shows your relevant skills / before sending the application
check the notice period|kiểm tra thời gian cần báo trước khi nghỉ việc|before agreeing on a start date / in the employment terms / before making my plans
leave clear handover notes|để lại ghi chú bàn giao rõ ràng|before moving to another role / for the person taking over / on my final working day
''')

verbs('Lãnh đạo và định hướng',3,'Dùng khi điều phối nhóm và thảo luận định hướng dài hơn.',r'''
set the direction|định hướng|for the next quarter / before assigning detailed tasks / at the planning workshop
explain the vision|giải thích định hướng mong muốn|in simple language / to the new team members / during the annual meeting
communicate the change|thông báo rõ sự thay đổi|before it takes effect / to everyone affected / once the plan is approved
lead by example|làm gương bằng hành động|when asking the team to improve / during the busy season / by keeping my own commitments
encourage participation|khuyến khích mọi người tham gia|during team discussions / from quieter colleagues / by asking open questions
delegate the work|giao bớt công việc phù hợp cho người khác|with clear expectations / before taking on another project / after checking everyone's skills
provide direction|hướng dẫn định hướng|when the team is unsure / at the start of the project / before leaving the group to work
remove confusion|giải tỏa sự mơ hồ|about who owns each task / by explaining the decision / during the planning meeting
build on our strengths|phát huy điểm mạnh của nhóm|when assigning roles / in the next project / while planning the new service
address a concern|giải quyết điều lo ngại|before it affects the team / raised during the survey / at the next staff meeting
handle a disagreement|xử lý bất đồng|before it grows / by listening to both sides / in a private discussion
create space for ideas|dành cơ hội cho ý tưởng|during the weekly meeting / from people in different roles / at the next workshop
encourage honest feedback|khuyến khích góp ý thẳng thắn|throughout the trial / by asking clear questions / during the team review
recognize individual effort|ghi nhận nỗ lực của từng người|after the busy period / during the monthly review / when sharing the results
support a decision|ủng hộ một quyết định|once the team has agreed / with clear reasons / after reviewing the information
explain the reasoning|giải thích cách suy nghĩ dẫn tới quyết định|behind the new plan / before asking for approval / during the staff meeting
plan for the long term|lập kế hoạch dài hạn|as well as next month / when choosing a supplier / during the strategy review
identify new opportunities|nhận ra cơ hội mới|from customer feedback / for collaboration / after reviewing the market report
review our priorities|xem xét lại ưu tiên của nhóm|when the situation changes / with the department head / at the start of each month
adapt to change|thích nghi với thay đổi|as the team grows / by learning the new process / with support from colleagues
start with a small trial|bắt đầu bằng đợt thử nhỏ|before changing the whole process / with one team / to check whether the idea works
measure the results|đo lường kết quả|against the agreed goals / after the first month / before proposing a wider change
share the lessons learned|chia sẻ bài học rút ra|after the project ends / with the other teams / during the final review
build a stronger team|xây dựng nhóm vững mạnh hơn|through better communication / by supporting new colleagues / over the next few months
turn the plan into action|đưa kế hoạch vào thực hiện|by assigning clear tasks / after confirming the resources / at the start of next week
''')

sentences('Giới thiệu bản thân',5,'Dùng khi làm quen và chia sẻ thông tin cơ bản về bản thân.',r'''
Nice to meet you|Rất vui được gặp bạn|Nice to meet you, Linh.|It's nice to meet you at last.|Nice to meet you, and welcome to the group.
My name is|Tên tôi là|My name is Minh, and I'm new here.|My name is Anna, but you can call me Ann.|My name is David, and this is my sister.
You can call me|Bạn có thể gọi tôi là|You can call me Ben.|My full name is Anh Nguyen, but you can call me Anh.|You can call me Sam if that's easier.
I'm from|Tôi đến từ|I'm from Da Nang.|I'm from a small town near Hanoi.|I'm from Vietnam, but I live here now.
I grew up in|Tôi lớn lên ở|I grew up in a quiet village.|I grew up in Hanoi with my grandparents.|I grew up in this neighborhood, so I know it well.
I live with|Tôi sống cùng|I live with my sister.|I live with two close friends.|I live with my parents at the moment.
I've lived here for|Tôi đã sống ở đây được|I've lived here for two years.|I've lived here for about six months.|I've lived here for most of my life.
I'm new here|Tôi mới đến đây|I'm new here, so I don't know many people.|Hello, I'm new here.|I'm new here, but everyone seems friendly.
This is my first time|Đây là lần đầu tôi|This is my first time at this club.|This is my first time meeting your family.|This is my first time joining a group like this.
What should I call you|Tôi nên gọi bạn là gì|What should I call you?|What should I call you when I introduce you?|What should I call you, Alex or Alexander?
How do you spell|Bạn đánh vần thế nào|How do you spell your name?|How do you spell your surname?|How do you spell the name of your hometown?
How do you pronounce|Bạn phát âm thế nào|How do you pronounce your name?|How do you pronounce this family name?|How do you pronounce the name of your village?
Where are you from|Bạn đến từ đâu|Where are you from?|Where are you from originally?|Where are you from, and how long have you lived here?
What do you do|Bạn làm nghề gì|What do you do for a living?|What do you do, if you don't mind me asking?|What do you do at the company?
I work as|Tôi làm công việc|I work as a designer.|I work as a teacher at a small school.|I work as an assistant for a local company.
I work for|Tôi làm cho|I work for a small company.|I work for a family business.|I work for an international team based in Hanoi.
I'm interested in|Tôi quan tâm đến|I'm interested in photography.|I'm interested in how people learn languages.|I'm interested in local history and old buildings.
In my free time|Trong thời gian rảnh|In my free time, I draw pictures.|I like reading in my free time.|In my free time, I meet friends or listen to music.
One thing about me|Một điều về tôi|One thing about me is that I love meeting new people.|One thing about me is that I'm usually quiet at first.|One thing about me is that I remember faces easily.
I don't think we've met|Tôi nghĩ chúng ta chưa gặp nhau|I don't think we've met before.|I don't think we've met; my name is Mai.|I don't think we've met, but I know your brother.
Have we met before|Chúng ta từng gặp nhau chưa|Have we met before?|Have we met before, perhaps at Lan's party?|Have we met before, or do you know my sister?
Let me introduce myself|Để tôi tự giới thiệu|Let me introduce myself: I'm Nam.|Let me introduce myself before we begin.|Let me introduce myself; I'm one of Linh's neighbors.
Let me introduce you to|Để tôi giới thiệu bạn với|Let me introduce you to my friend Hoa.|Let me introduce you to my older brother.|Let me introduce you to the rest of the group.
This is my friend|Đây là bạn của tôi|This is my friend Daniel.|This is my friend Mai, who lives next door.|This is my friend Tom, and this is his partner.
We haven't met yet|Chúng ta chưa làm quen|We haven't met yet; I'm Rosa.|I think we haven't met yet.|We haven't met yet, but I've heard a lot about you.
''')

sentences('Gặp lại và chuyện trò',5,'Dùng để bắt đầu trò chuyện hoặc gặp lại người quen.',r'''
Good to see you|Rất vui được gặp bạn|It's good to see you again.|Good to see you, Minh.|It's so good to see you after all this time.
Long time no see|Lâu rồi không gặp|Long time no see, Anna!|Long time no see; how have you been?|Long time no see, and you haven't changed much!
How have you been|Dạo này bạn thế nào|How have you been?|How have you been since we last met?|How have you been these past few months?
What have you been up to|Gần đây bạn làm những gì|What have you been up to lately?|What have you been up to since the summer?|What have you been up to this week?
How's your day going|Hôm nay của bạn thế nào|How's your day going?|How's your day going so far?|Hi, Lan; how's your day going?
How was your weekend|Cuối tuần vừa rồi của bạn thế nào|How was your weekend?|How was your weekend with your family?|How was your weekend, and did you do anything fun?
What did you get up to|Bạn đã làm gì|What did you get up to yesterday?|What did you get up to over the weekend?|What did you get up to while I was away?
Anything new|Có gì mới không|Is there anything new with you?|Anything new since we last talked?|Is there anything new you'd like to share?
How are things|Mọi việc thế nào|How are things with you?|How are things at home?|How are things since your brother moved away?
It's been a while|Đã lâu rồi|It's been a while since we last talked.|It's been a while, but I still remember your name.|It's been a while since everyone was together.
Same as usual|Vẫn như mọi khi|Things are the same as usual.|My week was the same as usual.|Everything is more or less the same as usual.
Not much has changed|Không có nhiều thay đổi|Not much has changed here.|Not much has changed since you left.|Not much has changed, but I have a new neighbor.
I've been keeping busy|Tôi vẫn khá bận rộn|I've been keeping busy this month.|I've been keeping busy with a few personal projects.|I've been keeping busy, but I still make time for friends.
It's nice to catch up|Thật vui khi trò chuyện để biết tin nhau|It's nice to catch up with you.|It's nice to catch up after so long.|It's nice to catch up without being in a hurry.
How do you know|Bạn quen ai đó như thế nào|How do you know Linh?|How do you know the host?|How do you know my cousin?
We met through|Chúng tôi quen nhau qua|We met through a mutual friend.|We met through a local club.|We met through my sister a few years ago.
We used to|Trước đây chúng tôi thường|We used to be neighbors.|We used to spend every weekend together.|We used to talk for hours after class.
Do you come here often|Bạn có thường đến đây không|Do you come here often?|Do you come here often with your friends?|Do you come here often, or is this your first visit?
Is this your first time|Đây có phải lần đầu của bạn|Is this your first time here?|Is this your first time meeting the group?|Is this your first time at one of these events?
What brings you here|Điều gì đưa bạn đến đây|What brings you here today?|What brings you here this evening?|What brings you here, a friend or the event itself?
I've heard a lot about you|Tôi đã nghe nhiều về bạn|I've heard a lot about you from Mai.|I've heard a lot about you, so it's nice to meet you.|I've heard a lot about you and your photography.
That sounds like you|Nghe đúng là phong cách của bạn|You helped everyone again; that sounds like you.|That sounds like you, always making people laugh.|That sounds like you; you never miss a chance to meet someone new.
Small world|Thế giới thật nhỏ, thật trùng hợp|It's a small world; we have the same neighbor.|What a small world!|It's a small world when you both know my cousin.
Fancy seeing you here|Thật bất ngờ gặp bạn ở đây|Fancy seeing you here, Ben!|Fancy seeing you here at Lan's birthday party!|Fancy seeing you here; I thought you were away.
I was just thinking about you|Tôi vừa nghĩ đến bạn|I was just thinking about you this morning.|I was just thinking about you when your message arrived.|I was just thinking about you and our old group.
''')

sentences('Duy trì cuộc trò chuyện',5,'Dùng để tiếp nối câu chuyện và hỏi về trải nghiệm của người đối diện.',r'''
Tell me about|Kể cho tôi về|Tell me about your new neighbor.|Tell me about your weekend.|Tell me about the people you met.
What happened next|Rồi chuyện gì xảy ra tiếp|What happened next on your trip?|What happened next after everyone arrived?|What happened next in the story?
How did it go|Chuyện đó diễn ra thế nào|How did it go yesterday?|How did it go when you met his family?|How did it go at the party?
What was it like|Điều đó như thế nào|What was it like growing up there?|What was it like meeting her again?|What was it like being part of such a big group?
How long have you|Bạn đã làm hoặc ở trạng thái đó bao lâu|How long have you known Mai?|How long have you been friends?|How long have you lived in this neighborhood?
When did you last|Lần cuối bạn làm việc đó là khi nào|When did you last see your cousins?|When did you last speak to him?|When did you last get together with the group?
Who were you with|Bạn đã ở cùng ai|Who were you with yesterday?|Who were you with at the event?|Who were you with when you met her?
How did you feel|Bạn đã cảm thấy thế nào|How did you feel when you saw him?|How did you feel after the conversation?|How did you feel when everyone surprised you?
What made you|Điều gì khiến bạn|What made you join the group?|What made you change your plans?|What made you decide to call her?
Did you have a good time|Bạn có vui không|Did you have a good time?|Did you have a good time with your cousins?|Did you have a good time at the party?
What do you mean by|Bạn muốn nói gì khi dùng từ đó|What do you mean by a quiet weekend?|What do you mean by close friends?|What do you mean by a big family?
Tell me more|Kể thêm cho tôi|Tell me more about your family.|That sounds interesting; tell me more.|Tell me more when we have a little time.
And then what|Rồi sau đó thì sao|And then what happened?|And then what did you say?|And then what did everyone do?
That reminds me of|Điều đó làm tôi nhớ đến|That reminds me of my first party here.|That reminds me of something my father said.|That reminds me of our old neighborhood.
Speaking of|Nhân nói về|Speaking of birthdays, when is yours?|Speaking of family, how is your sister?|Speaking of old friends, I saw Nam yesterday.
By the way|Nhân tiện|By the way, Mai says hello.|By the way, are you free on Sunday?|By the way, I found your umbrella.
Before I forget|Trước khi tôi quên|Before I forget, here's your photo.|Before I forget, Lan asked about you.|Before I forget, happy birthday!
I was going to say|Tôi đang định nói|I was going to say the same thing.|I was going to say that you look familiar.|I was going to say we should invite Minh too.
You were saying|Bạn đang nói đến đâu|You were saying something about your brother.|Sorry for the interruption; you were saying?|You were saying that you met her last week.
Where were we|Chúng ta đang nói đến đâu nhỉ|Where were we before the phone rang?|Where were we in the story?|Now, where were we?
As I was saying|Như tôi đang nói lúc nãy|As I was saying, we met through my cousin.|As I was saying, everyone enjoyed the evening.|As I was saying, I haven't seen her for years.
To cut a long story short|Nói ngắn gọn lại chuyện dài|To cut a long story short, we became good friends.|To cut a long story short, everyone arrived late.|To cut a long story short, she said yes.
The funny thing is|Điều buồn cười là|The funny thing is that we have the same birthday.|The funny thing is that nobody knew his real name.|The funny thing is that she was standing right behind me.
You won't believe|Bạn sẽ không tin được|You won't believe who I saw yesterday.|You won't believe what happened at the party.|You won't believe how much the children have grown.
Guess what|Đoán xem có chuyện gì|Guess what: my sister is getting married!|Guess what happened when I called her!|Guess what: I ran into our old neighbor!
''')

sentences('Bạn bè và giữ liên lạc',5,'Dùng khi nói về tình bạn và liên hệ với người quen.',r'''
keep in touch|giữ liên lạc|Let's keep in touch after you move.|We keep in touch through short messages.|I try to keep in touch with my old friends.
lose touch|mất liên lạc|I don't want us to lose touch.|It's easy to lose touch when everyone is busy.|Let's not lose touch again.
get in touch|liên hệ|I'll get in touch when I'm back.|You can get in touch with me through Lan.|Please get in touch if you hear from him.
hear from you|nhận được tin của bạn|It's lovely to hear from you.|I hope to hear from you soon.|I was happy to hear from you after so long.
drop me a line|gửi vài dòng tin nhắn cho tôi|Drop me a line when you have time.|Please drop me a line after the party.|You can drop me a line anytime.
leave me a message|để lại lời nhắn cho tôi|Leave me a message if I don't answer.|Please leave me a message with the details.|You can leave me a message here.
call me back|gọi lại cho tôi|Can you call me back later?|Please call me back when you're free.|You can call me back this evening.
give me a call|gọi điện cho tôi|Give me a call when you arrive.|Please give me a call if your plans change.|You can give me a call after dinner.
text me when|nhắn tin cho tôi khi|Text me when you're free.|Please text me when you get there.|Text me when you know the date.
I'll let you know|Tôi sẽ báo cho bạn|I'll let you know when I'm free.|I'll let you know if Lan can come.|I'll let you know as soon as I hear from him.
How can I reach you|Tôi có thể liên hệ bạn bằng cách nào|How can I reach you later?|How can I reach you if the plan changes?|How can I reach you while you're away?
Do you have my number|Bạn có số điện thoại của tôi chưa|Do you have my number?|Do you have my number, or should I send it?|Do you have my number from last time?
I've changed my number|Tôi đã đổi số điện thoại|I've changed my number, so please save this one.|I've changed my number since we last talked.|I've changed my number, but my email is the same.
I haven't heard from|Tôi chưa nhận được tin từ|I haven't heard from Nam this week.|I haven't heard from my cousin for a while.|I haven't heard from her since the party.
I meant to call|Tôi đã định gọi|I meant to call you yesterday.|I meant to call earlier, but the day got busy.|I meant to call and ask about your family.
We go way back|Chúng tôi quen nhau từ rất lâu|We go way back to our school days.|We go way back, so we know each other well.|We go way back; our families used to be neighbors.
a mutual friend|một người bạn chung|We met through a mutual friend.|A mutual friend introduced us last year.|Do you and Mai have a mutual friend?
a close friend|một người bạn thân|Lan is a close friend of mine.|I told a close friend about the news.|It's good to have a close friend nearby.
get along with|hòa hợp với|I get along with all my neighbors.|Do you get along with his friends?|It's easy to get along with Mai.
have a lot in common|có nhiều điểm chung|We have a lot in common.|You and my brother have a lot in common.|I didn't know we would have a lot in common.
spend time together|dành thời gian bên nhau|We try to spend time together on Sundays.|I'd like us to spend time together more often.|Good friends don't have to spend time together every day.
be there for you|ở bên hỗ trợ bạn|I'll be there for you if things get difficult.|A good friend will be there for you.|I want to be there for you, even from far away.
count on me|tin cậy vào tôi|You can count on me.|Please count on me if you need someone to talk to.|You can count on me to keep your secret.
pick up where we left off|tiếp tục từ chỗ trước đây|Let's pick up where we left off.|When we meet, we always pick up where we left off.|We can pick up where we left off in our conversation.
send my regards|gửi lời hỏi thăm của tôi|Please send my regards to your parents.|Send my regards to the whole family.|Could you send my regards to your sister?
''')

sentences('Gia đình và người thân',5,'Dùng khi trò chuyện về gia đình và các mối quan hệ thân thuộc.',r'''
How's your family|Gia đình bạn thế nào|How's your family doing these days?|How's your family these days?|How's your family since the move?
Do you have any siblings|Bạn có anh chị em ruột không|Do you have any siblings?|Do you have any siblings living nearby?|Do you have any siblings, or are you an only child?
I'm an only child|Tôi là con một|I'm an only child.|I'm an only child, but I have many cousins.|I'm an only child, so my friends feel like family.
I'm the oldest|Tôi là người lớn tuổi nhất hoặc con cả|I'm the oldest of three children.|I'm the oldest, and my sister is the youngest.|I'm the oldest in my group of cousins.
I'm the youngest|Tôi là người nhỏ tuổi nhất hoặc con út|I'm the youngest in my family.|I'm the youngest of four children.|I'm the youngest, but I'm taller than my brothers.
my older brother|anh trai của tôi|My older brother lives nearby.|This is my older brother, Nam.|I usually ask my older brother for advice.
my younger sister|em gái của tôi|My younger sister is very outgoing.|I went to the party with my younger sister.|My younger sister and I have a lot in common.
on my mother's side|bên ngoại, phía gia đình mẹ|I have many cousins on my mother's side.|My grandparents on my mother's side live nearby.|We visited relatives on my mother's side.
on my father's side|bên nội, phía gia đình bố|I have an uncle on my father's side who lives here.|My cousins on my father's side are all older than me.|We had a family gathering on my father's side.
family members|các thành viên gia đình|All our family members are in this photo.|Several family members came to help.|We try to remember every family member's birthday.
extended family|gia đình gồm cả họ hàng ngoài bố mẹ và con cái|My extended family meets once a year.|I grew up close to my extended family.|We invited our extended family to the celebration.
a family gathering|một buổi tụ họp gia đình|We have a family gathering on Sunday.|I saw all my cousins at a family gathering.|A family gathering is a good chance to catch up.
a family tradition|một truyền thống gia đình|Taking a photo together is a family tradition.|We have a family tradition of writing birthday notes.|This celebration has become a family tradition.
run in the family|là đặc điểm chung trong gia đình|A love of music seems to run in the family.|That sense of humor must run in the family.|Does being good at drawing run in the family?
take after|giống người thân về tính cách hoặc ngoại hình|I take after my mother.|People say I take after my grandfather.|Do you take after anyone in your family?
look like your|trông giống người thân của bạn|You look like your mother.|You look like your brother in this photo.|You look like your father when you smile.
be close to|gắn bó thân thiết với|It's nice to be close to your cousins.|I hope my children will be close to each other.|You don't have to live nearby to be close to your family.
grow up together|lớn lên cùng nhau|It's special to grow up together.|Our children will grow up together.|I hope the cousins can grow up together.
bring the family together|kết nối hoặc tụ họp gia đình|Birthdays bring the family together.|We want to bring the family together more often.|A shared tradition can bring the family together.
spend time with family|dành thời gian với gia đình|I like to spend time with family on weekends.|We try to spend time with family whenever possible.|Do you often spend time with family?
visit relatives|thăm họ hàng|We usually visit relatives during the holidays.|I'd like to visit relatives I haven't seen for years.|Do you visit relatives very often?
check on my parents|hỏi thăm hoặc xem bố mẹ có ổn không|I call to check on my parents every few days.|I'll check on my parents this evening.|I asked my sister to check on my parents.
get the family together|sắp xếp để cả gia đình tụ họp|Let's get the family together next month.|It's hard to get the family together on weekdays.|We managed to get the family together for her birthday.
welcome to the family|Chào mừng đến với gia đình|Welcome to the family, Anna.|We all want to say welcome to the family.|Welcome to the family; we're happy you're here.
part of the family|một thành viên của gia đình|You are part of the family now.|Our neighbor feels like part of the family.|He has always treated me as part of the family.
''')

sentences('Lời mời và nhận lời',5,'Dùng khi mời người khác tham gia một hoạt động xã hội.',r'''
Would you like to join us|Bạn có muốn tham gia cùng chúng tôi không|Would you like to join us this evening?|Would you like to join us for the celebration?|Would you like to join us when we meet Mai?
Do you feel like|Bạn có hứng làm gì không|Do you feel like meeting up later?|Do you feel like coming to the party?|Do you feel like spending some time together?
Are you free|Bạn có rảnh không|Are you free on Saturday?|Are you free for a quick chat?|Are you free this evening, or do you have plans?
Do you have any plans|Bạn có kế hoạch gì chưa|Do you have any plans for Sunday?|Do you have any plans this evening?|Do you have any plans for your birthday?
Why don't we|Hay là chúng ta|Why don't we invite Hoa too?|Why don't we get together this weekend?|Why don't we call him together?
How about we|Hay là chúng ta|How about we meet on Sunday?|How about we invite the neighbors?|How about we plan a small celebration?
What about|Còn về, hay là|What about meeting a little earlier?|What about inviting your brother?|What about next Saturday instead?
Let's get together|Hãy gặp mặt hoặc tụ họp|Let's get together this weekend.|Let's get together when you're back.|Let's get together with the old group soon.
Let's meet up|Hãy hẹn gặp nhau|Let's meet up on Friday.|Let's meet up after the event.|Let's meet up somewhere quiet so we can talk.
Come along|Đi cùng hoặc tham gia cùng|Come along if you're free.|You're welcome to come along with us.|Please come along and meet my friends.
Come over|Ghé nhà chơi|Come over this afternoon if you like.|You should come over and meet my family.|Why don't you come over on Sunday?
Join us for|Tham gia cùng chúng tôi trong|Join us for a small celebration.|Would you like to join us for an evening with friends?|Please join us for my sister's birthday party.
You're invited|Bạn được mời|You're invited to my birthday party.|You're invited, and you can bring a friend.|Of course you're invited; we would love to see you.
Feel free to bring|Bạn cứ thoải mái mang hoặc rủ theo|Feel free to bring a friend.|Feel free to bring your partner.|Feel free to bring your brother along.
Can I bring a friend|Tôi có thể rủ một người bạn đến không|Can I bring a friend?|Can I bring a friend to the party?|Can I bring a friend who just moved here?
I'd love to come|Tôi rất muốn đến|I'd love to come on Saturday.|I'd love to come, and thank you for inviting me.|I'd love to come if there is still room.
Count me in|Cho tôi tham gia với|Count me in for Sunday.|That sounds fun; count me in.|Count me in, and let me know the time.
I wouldn't miss it|Tôi nhất định sẽ tham dự|I wouldn't miss it for anything.|It's your birthday; I wouldn't miss it.|I wouldn't miss it, so please save me a place.
I'll be there|Tôi sẽ có mặt|I'll be there at seven.|I'll be there, even if I arrive a little late.|You can count on me; I'll be there.
Can I let you know|Tôi có thể báo lại cho bạn được không|Can I let you know tomorrow?|Can I let you know after I check my plans?|Can I let you know by Friday?
I'll check my plans|Tôi sẽ kiểm tra lịch của mình|I'll check my plans and reply tonight.|I'll check my plans before I say yes.|I'll check my plans, but I think I'm free.
I already have plans|Tôi đã có kế hoạch khác|I already have plans for Saturday.|I'd love to join, but I already have plans.|I already have plans that evening, unfortunately.
Maybe another time|Có lẽ để dịp khác|Maybe another time would be better.|I can't come tonight, but maybe another time.|Maybe another time, when everyone is free.
Can we take a rain check|Chúng ta để dịp khác được không|Can we take a rain check on our evening together?|Can we take a rain check until next weekend?|Can we take a rain check? Something has come up.
The more the merrier|Càng đông càng vui|Bring your friends; the more the merrier.|The more the merrier, so your sister is welcome.|Of course he can join; the more the merrier.
''')

sentences('Hẹn gặp và thu xếp kế hoạch',5,'Dùng để thống nhất giờ gặp và điều chỉnh kế hoạch với người quen.',r'''
What time suits you|Mấy giờ phù hợp với bạn|What time suits you on Sunday?|What time suits you best?|What time suits you if we meet tomorrow?
When are you available|Khi nào bạn rảnh|When are you available this weekend?|When are you available for a call?|When are you available to meet the others?
Does Friday work for you|Thứ Sáu có phù hợp với bạn không|Does Friday work for you?|Does Friday work for you this week?|Does Friday work for you, or would Saturday be better?
Let's say|Hay chốt là|Let's say six o'clock.|Let's say Sunday afternoon, if that works.|Let's say around seven, but I'll confirm later.
Shall we meet|Chúng ta gặp nhau nhé|Shall we meet at six?|Shall we meet before the party?|Shall we meet at the entrance?
Where shall we meet|Chúng ta nên gặp ở đâu|Where shall we meet?|Where shall we meet on Saturday?|Where shall we meet before joining the others?
I'll meet you at|Tôi sẽ gặp bạn tại|I'll meet you at the front door.|I'll meet you at six o'clock.|I'll meet you at the usual place.
the usual place|địa điểm quen thuộc thường hẹn|Let's meet at the usual place.|I'll wait at the usual place.|Do you mean the usual place near your building?
at the entrance|ở lối vào|I'll see you at the entrance.|Everyone is waiting at the entrance.|Let's meet at the entrance at seven.
around six|khoảng sáu giờ|I'll be there around six.|We usually get together around six.|Is around six a good time for you?
sometime next week|vào lúc nào đó tuần sau|Let's catch up sometime next week.|Are you free sometime next week?|I'll call you sometime next week.
closer to the time|gần đến thời điểm đó hơn|Let's decide closer to the time.|I'll confirm closer to the time.|We can check with everyone closer to the time.
keep the evening free|để trống buổi tối đó|Please keep the evening free.|I'll keep the evening free for your party.|Can you keep the evening free until we confirm?
make it a little later|đổi giờ muộn hơn một chút|Can we make it a little later?|Let's make it a little later so Mai can come.|I'd prefer to make it a little later.
bring a friend along|rủ thêm một người bạn đi cùng|You can bring a friend along.|May I bring a friend along?|Feel free to bring a friend along on Sunday.
Something came up|Có việc đột xuất xảy ra|Something came up, so I can't come tonight.|Something came up at the last minute.|I'm sorry; something came up this afternoon.
Can we change the plan|Chúng ta đổi kế hoạch được không|Can we change the plan for Sunday?|Can we change the plan and meet earlier?|Can we change the plan if it rains?
Let's leave it for now|Tạm để việc đó lại sau|Let's leave it for now and decide tomorrow.|Let's leave it for now until everyone replies.|If we can't find a date, let's leave it for now.
Let's play it by ear|Hãy tùy tình hình rồi quyết định|Let's play it by ear this weekend.|Let's play it by ear and see when everyone arrives.|We don't need a fixed plan; let's play it by ear.
I'll see what I can do|Tôi sẽ xem mình thu xếp được không|I'll see what I can do about Friday.|I'll see what I can do, but I can't promise.|I'll see what I can do and message you tonight.
Let me check with|Để tôi hỏi lại với|Let me check with my sister.|Let me check with the others before choosing a date.|Let me check with Mai to see if she's free.
Is everyone still coming|Mọi người vẫn đến chứ|Is everyone still coming tonight?|Is everyone still coming to the party?|Is everyone still coming, or have the plans changed?
The plan is still on|Kế hoạch vẫn được giữ|The plan is still on for Sunday.|The plan is still on, so I'll see you at six.|The plan is still on unless you hear from me.
See you there|Gặp bạn ở đó nhé|See you there at seven.|Great, see you there on Saturday.|See you there, and bring your sister if she is free.
I'm looking forward to seeing you|Tôi mong được gặp bạn|I'm looking forward to seeing you again.|I'm looking forward to seeing you on Sunday.|I'm looking forward to seeing you and meeting your family.
''')

sentences('Đến chơi và tạm biệt',5,'Dùng khi đến gặp, đón tiếp và kết thúc một buổi gặp gỡ.',r'''
I'm on my way|Tôi đang trên đường đến|I'm on my way now.|I'm on my way, and I'll be there soon.|I'm on my way to meet the others.
I'm running a little late|Tôi đang đến muộn một chút|I'm running a little late.|I'm running a little late, so please start without me.|I'm running a little late but should be there in ten minutes.
I'll be there soon|Tôi sẽ đến đó sớm thôi|I'll be there soon.|Don't worry; I'll be there soon.|I'll be there soon, so wait for me at the entrance.
I'm almost there|Tôi gần đến nơi rồi|I'm almost there now.|I'm almost there; please give me two minutes.|I'm almost there, so I'll call when I arrive.
I've just arrived|Tôi vừa đến|I've just arrived at the entrance.|I've just arrived; where are you?|I've just arrived, and I can see the others.
Where are you waiting|Bạn đang đợi ở đâu|Where are you waiting?|Where are you waiting for us?|Where are you waiting, inside or outside?
I can see you|Tôi nhìn thấy bạn rồi|I can see you near the door.|I can see you now.|I can see you, so stay where you are.
Come on in|Mời vào|Come on in, everyone.|Come on in; we're glad you're here.|Come on in and meet the others.
Make yourself at home|Cứ tự nhiên như ở nhà|Please make yourself at home.|Make yourself at home while I call Mai.|Come in and make yourself at home.
Have a seat|Mời ngồi|Please have a seat.|Have a seat next to me.|Come in and have a seat with the others.
You're just in time|Bạn đến vừa kịp lúc|You're just in time for the family photo.|You're just in time; everyone has arrived.|You're just in time to meet my brother.
Glad you could make it|Rất vui vì bạn thu xếp đến được|I'm glad you could make it.|Glad you could make it, Lan.|We're glad you could make it after such a busy day.
Thanks for having me|Cảm ơn đã mời và đón tiếp tôi|Thanks for having me today.|Thanks for having me; I had a lovely time.|Thanks for having me and making me feel welcome.
Thanks for coming|Cảm ơn vì đã đến|Thanks for coming to my party.|Thanks for coming all this way.|Thanks for coming; it was lovely to see you.
I had a lovely time|Tôi đã có khoảng thời gian rất vui|I had a lovely time with your family.|I had a lovely time, so thank you for inviting me.|I had a lovely time at the celebration.
It was nice seeing you|Rất vui vì đã gặp bạn|It was nice seeing you today.|It was nice seeing you again after so long.|It was nice seeing you and catching up.
I should get going|Tôi nên đi rồi|I should get going soon.|I should get going; it's getting late.|I should get going, but let's meet again soon.
I'd better be off|Tôi nên đi thôi|I'd better be off now.|I'd better be off before it gets too late.|I'd better be off, but thank you for a lovely evening.
Don't let me keep you|Tôi không giữ chân bạn nữa|Don't let me keep you if you're busy.|Don't let me keep you; we can talk later.|You have things to do, so don't let me keep you.
Let's do this again|Hôm nào mình lại gặp như thế này nhé|Let's do this again soon.|Let's do this again next month.|That was fun; let's do this again.
Give everyone my love|Gửi lời thân mến của tôi đến mọi người|Give everyone my love when you get home.|Please give everyone my love.|Give everyone my love, especially your parents.
See you around|Hẹn gặp lại khi có dịp|See you around, Minh.|I have to go; see you around.|See you around the neighborhood.
Until next time|Hẹn lần tới|Until next time, take care.|Goodbye, and until next time!|Until next time, keep in touch.
Take care of yourself|Giữ gìn bản thân nhé|Take care of yourself while you're away.|Please take care of yourself.|Goodbye, and take care of yourself.
Have a lovely evening|Chúc một buổi tối vui vẻ|Have a lovely evening with your family.|Have a lovely evening, everyone.|Have a lovely evening, and I'll see you tomorrow.
''')

# A few reciprocal and pronoun-sensitive phrases need subjects tailored to their meaning.
OVERRIDES={
'get back to you':["I'll get back to you with an answer today.","We will get back to you about the final dates tomorrow.","My colleague will get back to you as soon as the venue is confirmed."],
'check what you mean':["Let me check what you mean before I answer.","I'd like to check what you mean by a flexible deadline.","I'll check what you mean about the new schedule before changing it."],
'introduce ourselves':["We need to introduce ourselves before starting the talk.","Let's introduce ourselves to the visiting team.","We will introduce ourselves at the opening session."],
'support each other':["We need to support each other during the busy period.","We can support each other when the work gets difficult.","Let's support each other by sharing useful notes."],
'family members':["All our family members are in this photo.","Several family members came to help.","We try to remember the birthdays of all our family members."],
}
for item in DATA:
    if item['chunk'] in OVERRIDES:
        item['examples']=OVERRIDES[item['chunk']]
work=[x for x in DATA if x['category']=='Work']
general=[x for x in DATA if x['category']=='Everyday']
assert len(work)==450,len(work)
assert len(general)==200,len(general)
for i,item in enumerate(work,1):
    item['id']=f'work-{i:04d}'
for i,item in enumerate(general,551):
    item['id']=f'general-{i:04d}'

extra_path=Path('src/content/chunks/work-social-extra.json')
if extra_path.exists():
    extra=json.loads(extra_path.read_text())
    assert len(extra)==200,len(extra)
    DATA.extend(extra)

for item in DATA:
    item["frequency"] = frequency_for(item)

seen=set()
for item in DATA:
    normalized=re.sub(r'[^a-z0-9]+',' ',item['chunk'].lower()).strip()
    assert normalized not in seen,('duplicate',item['chunk'])
    seen.add(normalized)
    assert len(item['examples'])==3
    assert len(set(item['examples']))==3
    assert all(re.search(r'[.!?]$',example) for example in item['examples']),(item['chunk'],item['examples'])
    assert all(item[k] for k in ('id','chunk','explanation','topic'))
Path('src/content/chunks/work.json').write_text(json.dumps(DATA,ensure_ascii=False,indent=2)+'\n')
print(f'Wrote {len(DATA)} records: {len(work)} Work + {len(DATA)-len(work)} Everyday')
