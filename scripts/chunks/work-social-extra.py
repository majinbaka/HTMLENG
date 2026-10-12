"""Authoring source for 200 everyday social chunks, merged by build-work.py.
Each row supplies a reusable expression and three separately written contexts.
Frequency is an editorial estimate, not a corpus measurement.
"""
import json
from pathlib import Path
from work_frequency import frequency_for

SOURCE = r"""
@Cảm xúc và phản ứng|diễn tả cảm xúc trong giao tiếp hằng ngày|5
I'm glad|tôi vui vì|you enjoyed the meal|we had time to talk|the weather is getting better
I'm happy for you|tôi vui cho bạn|because you passed the exam|and your family must be proud|; you worked hard for this
I'm looking forward to|tôi mong chờ một việc sắp tới|seeing my cousins this weekend|a quiet evening at home|hearing about your trip
I can't wait to|tôi rất háo hức muốn|see the photos you took|try the new swimming pool|spend a few days with my family
I'm excited about|tôi hào hứng về|my first painting class|the trip we planned together|having a place of my own
I'm proud of|tôi tự hào về|the progress I've made|my sister for trying again|you for asking for help
I'm relieved to hear|tôi thấy nhẹ nhõm khi nghe|that you arrived safely|that your dog is back home|that the missing bag was found
That's a relief|thật nhẹ nhõm khi biết điều đó|; I thought I had lost my keys|because we were worried about you|; we still have time to get there
I'm in a good mood|tôi đang có tâm trạng tốt|after a walk in the park|because I slept well last night|and feel like cooking something special
That made my day|điều đó làm tôi vui cả ngày|because I wasn't expecting a gift|; your message was so kind|after a difficult morning
I'm worried about|tôi lo lắng về|my friend's long journey|how much the repair will cost|leaving the cat alone overnight
I'm a little nervous|tôi hơi lo hoặc hồi hộp|about meeting everyone tonight|before speaking in front of a group|because this is my first dance class
I'm afraid of|tôi sợ một điều gì|getting lost in a big city|heights, so I prefer the lower seats|saying the wrong thing
I'm not comfortable with|tôi không thấy thoải mái với|sharing that story in public|being in a crowded room|this kind of joke
I feel awkward|tôi cảm thấy ngượng ngùng|when I forget someone's name|about asking for another favor|because I arrived much too early
I'm feeling down|tôi đang buồn hoặc xuống tinh thần|after a difficult week|and would like some company|because I miss my old friends
I'm disappointed that|tôi thất vọng vì|the concert has been canceled|we couldn't spend more time together|my drawing didn't turn out as I hoped
I'm upset about|tôi buồn hoặc khó chịu về|what happened yesterday|losing a gift from my grandmother|the way he spoke to my friend
I'm tired of|tôi đã chán hoặc mệt vì việc lặp lại|arguing about the same thing|waiting without knowing what's happening|hearing that joke every day
I've had enough of|tôi không muốn chịu đựng thêm|the noise outside tonight|people interrupting me|this argument; let's take a break
I'm confused about|tôi chưa hiểu rõ và thấy bối rối về|which entrance we should use|what you meant by that comment|the rules of this game
I'm surprised that|tôi ngạc nhiên vì|you remembered my favorite song|the place is so quiet today|we grew up in the same town
I wasn't expecting|tôi đã không ngờ hoặc không chuẩn bị cho|such a warm welcome|to see you here today|the ending to be so sad
I don't know how to feel|tôi chưa biết mình nên cảm thấy thế nào|about moving away from home|after hearing that news|because everything changed so quickly
It's hard to explain|thật khó giải thích|why that song makes me emotional|how much this place means to me|what I felt at that moment
@An ủi và điều chỉnh cảm xúc|chia sẻ cảm xúc và động viên một cách nhẹ nhàng|4
I know how you feel|tôi hiểu cảm giác của bạn|because I've been in a similar situation|; moving away can be difficult|when you say you miss home
That must be difficult|chắc điều đó khó khăn với bạn|when you live so far away|after such a long friendship|with so many changes at once
I'm here for you|tôi sẵn sàng ở bên và hỗ trợ bạn|if you want to talk|even if you don't know what to say|while you work through this
You don't have to explain|bạn không cần giải thích|if you would rather keep it private|everything to me right now|why you need some time alone
Take your time|cứ thong thả, không cần vội|; I'm happy to wait here|when you tell me what happened|and choose the words that feel right
There's no rush|không có gì phải vội|to make a decision tonight|; we can talk about it tomorrow|because the event doesn't start until six
Don't be too hard on yourself|đừng quá khắt khe với bản thân|for making one small mistake|when you're still learning|because everyone has difficult days
You did your best|bạn đã cố gắng hết sức|with the time you had|even though things didn't go as planned|and that matters to me
It's okay to feel|cảm thấy như vậy là điều có thể chấp nhận|nervous before trying something new|sad when a good friend moves away|unsure about a big change
That sounds frustrating|nghe có vẻ khiến bạn bực mình|after waiting for so long|when nobody explains the delay|especially if it happens every week
I can see why|tôi hiểu vì sao|you're excited about the news|that comment upset you|you wanted a little time alone
I didn't mean to upset you|tôi không có ý làm bạn buồn|with that question|when I changed the subject|; I was trying to understand
I need a moment|tôi cần một chút thời gian|to think about what you said|before I can answer that|to calm down after the argument
I need some space|tôi cần khoảng riêng để suy nghĩ|after our conversation|to sort out my feelings|but I still want to talk later
I'd rather talk about it later|tôi muốn nói chuyện đó vào lúc khác|when we both feel calmer|because I'm tired right now|if that's okay with you
Let's take a break from|hãy tạm nghỉ khỏi một việc|this conversation for a while|arguing and get some fresh air|talking about the problem tonight
I'm trying to stay calm|tôi đang cố giữ bình tĩnh|while we wait for an answer|because getting angry won't help|even though I'm worried
I feel better now|giờ tôi thấy dễ chịu hơn|that we've talked about it|after spending some time outside|but I'd still like a quiet evening
That means a lot to me|điều đó rất có ý nghĩa với tôi|because you know how hard I tried|especially coming from an old friend|after the week I've had
It helps to talk|nói ra giúp tôi thấy nhẹ lòng hơn|to someone who listens|when I have too much on my mind|about the things I can't change
I have mixed feelings about|tôi vừa có cảm xúc tích cực vừa có băn khoăn về|moving to a new city|the end of the school year|selling our old family home
I don't feel like myself|tôi không thấy mình như thường ngày|after so many changes|and I'd like a quiet afternoon|when I haven't had enough rest
I've got a lot on my mind|tôi đang có nhiều điều phải suy nghĩ|so I may seem a little quiet|with the move coming up|but I'd like to hear your news
I didn't take it personally|tôi không cho rằng điều đó nhằm vào cá nhân mình|because I knew you were upset|when you said you needed some time|; I understood what you meant
I'm ready to move on|tôi đã sẵn sàng bước tiếp|from that argument|and try something different|now that we've both apologized
@Sở thích và lựa chọn|nói điều mình thích hoặc không thích|5
I'd rather|tôi muốn chọn điều này hơn|stay home than go out tonight|sit near the window|watch a comedy this time
I prefer to|tôi thích làm theo cách này hơn|read before going to sleep|meet in a quiet place|make plans a few days ahead
I prefer this to|tôi thích cái này hơn cái kia|the one we tried yesterday|waiting in a long line|the louder music at the other place
I'm really into|tôi rất thích hoặc quan tâm đến|old films at the moment|learning about local history|acoustic music these days
I'm not really into|tôi không thích hoặc không hứng thú lắm với|competitive games|watching horror films alone|very crowded events
I'm a big fan of|tôi rất thích một người hoặc một thứ|her early songs|stories with a happy ending|quiet Sunday mornings
I'm not a fan of|tôi không thích lắm|loud music while I'm reading|surprise parties for myself|getting up before sunrise
I've always liked|tôi luôn thích từ trước đến nay|spending time near the sea|books with interesting characters|the sound of rain at night
I've never been keen on|từ trước tới nay tôi không thích lắm|being the center of attention|watching very long films|making plans at the last minute
I'd love to try|tôi rất muốn thử|a pottery class one day|that game you told me about|something I've never done before
I'm willing to try|tôi sẵn lòng thử dù chưa chắc thích|a different kind of music|the activity for one afternoon|your idea before choosing another one
I'd rather not|tôi muốn tránh làm việc đó|discuss that in front of everyone|be in the photograph today|stay out too late tonight
It's not really my thing|điều đó không hợp sở thích của tôi lắm|, but I hope you enjoy it|because I prefer quieter activities|, though I'm glad I tried it
It's just what I like|điều đó đúng sở thích của tôi|because it's simple and comfortable|in a story: warm characters and humor|for a relaxed evening with friends
I could listen to|tôi có thể nghe mãi một thứ mình thích|this song all evening|her stories for hours|the sound of the sea all day
I never get tired of|tôi không bao giờ thấy chán|watching that old film|hearing your childhood stories|walking around this neighborhood
I can't stand|tôi rất không thích hoặc không chịu được|the sound of people shouting|being interrupted all the time|waiting without any information
I don't mind|tôi không phiền hoặc không ngại|sitting at the back|waiting a few more minutes|if we choose a different place
I'm happy either way|chọn cách nào tôi cũng thấy được|because both films sound good|as long as we spend time together|; you can choose this time
Either one is fine|cái nào trong hai cái cũng được|because I like both colors|as a gift for my brother|; they both look comfortable
I like the idea of|tôi thích ý tưởng về việc|spending a weekend without screens|learning something with a friend|having a small celebration at home
I'm curious about|tôi tò mò và muốn biết thêm về|how you learned that skill|the story behind this picture|what life is like in your hometown
I'd be interested in|tôi sẽ hứng thú với|joining a beginner's class|hearing more about your experience|trying a new activity together
I'm not sure I'd enjoy|tôi không chắc mình sẽ thích|being on a stage|such a long journey alone|a party with so many strangers
I've changed my mind about|tôi đã đổi ý về|which film I want to see|joining the weekend activity|the color I liked yesterday
@Quyết định cá nhân|cân nhắc và lựa chọn trong đời sống|4
It's up to you|bạn có thể tự quyết định|which seat you take|whether we invite anyone else|; I'm happy with either option
The choice is yours|quyền lựa chọn thuộc về bạn|because it's your birthday|and there's no wrong answer|; you know what you enjoy
I haven't decided yet|tôi vẫn chưa quyết định|because both options look good|whether I'll join the class|but I'll let you know tomorrow
I'm still thinking about|tôi vẫn đang cân nhắc|whether to enter the competition|which book to read next|the suggestion you made yesterday
Let me think about it|cho tôi thời gian suy nghĩ việc đó|before I say yes|for a day or two|; it's a bigger decision than I expected
I'll give it some thought|tôi sẽ dành thời gian cân nhắc|over the weekend|before choosing a date|because your suggestion sounds interesting
I can't make up my mind|tôi chưa thể quyết được|between these two colors|about what to do this evening|because I like both ideas
I'm leaning toward|tôi đang nghiêng về lựa chọn|the smaller celebration|staying home this weekend|the blue one rather than the green one
I'll go with|tôi sẽ chọn|the simpler design|your suggestion this time|the earlier show so we can get home sooner
I'll stick with|tôi sẽ giữ lựa chọn hiện tại|the book I already started|my original plan for tonight|the color we chose yesterday
I'd choose this one|tôi sẽ chọn cái này|because it feels more comfortable|if I were buying it for myself|for a small room like mine
That would be my first choice|đó sẽ là lựa chọn ưu tiên của tôi|because I know the area well|if we can find a quiet table|but I'm open to other ideas
I'm open to suggestions|tôi sẵn sàng nghe các gợi ý|for a new hobby|because I haven't made any plans|about what to read next
I might give it a try|có lẽ tôi sẽ thử việc đó|if there's a beginner's class|the next time I have a free afternoon|because you seem to enjoy it
It's worth a try|điều đó đáng thử|even if it feels unfamiliar|because we have nothing planned|and we might discover a new interest
It's worth thinking about|điều đó đáng để suy nghĩ|before we make a promise|because it could change our routine|even if we don't decide today
There's no harm in asking|cứ hỏi cũng không có gì bất lợi|whether we can join the group|if they have another color|whether the time can be changed
I'd like to keep my options open|tôi muốn giữ nhiều khả năng lựa chọn|until I know my plans|for a few more days|rather than deciding tonight
I don't want to rush into|tôi không muốn vội vàng quyết định|a choice I'll regret|buying something expensive|a new activity before trying it
I've made up my mind|tôi đã quyết định rồi|to enter the competition|about which course to take|and I'd like to tell you why
I can always change it later|tôi luôn có thể đổi lại sau|if the color doesn't feel right|because this is only a rough plan|so I'm not too worried
I'll see how I feel|tôi sẽ xem lúc đó mình cảm thấy thế nào|after the long journey|before deciding whether to go out|when I wake up tomorrow
I'll take my chances|tôi chấp nhận thử dù kết quả chưa chắc|with the outdoor seats|and enter the small competition|because the experience sounds fun
I'd rather be sure|tôi muốn chắc chắn trước hơn|before I promise anything|that I have enough time|than make a decision too quickly
That settles it|vậy là quyết định xong|; we'll choose the earlier show|because everyone likes the same idea|; a quiet evening at home it is
@Ý kiến và mức độ chắc chắn|nêu ý kiến mà không khẳng định quá mức|5
I think it's|tôi nghĩ điều đó là|a lovely way to spend an afternoon|better to ask her first|too early to decide
I don't think it's|tôi không nghĩ điều đó là|a good idea to surprise him today|as difficult as it looks|fair to blame one person
In my opinion|theo ý kiến của tôi|, the ending was the best part|, a smaller group would be more comfortable|, both pictures have something special
The way I see it|theo cách tôi nhìn nhận|, we still have plenty of time|, the effort matters more than winning|, everyone should get a chance to speak
As far as I know|theo những gì tôi biết|, the club is open to beginners|, she still lives in the same town|, nobody has chosen a date yet
From what I've heard|theo những điều tôi đã nghe|, the book is very funny|, the new class is quite relaxed|, they had a wonderful time together
It seems to me that|tôi có cảm giác hoặc nhận thấy rằng|we both want the same thing|the story is about friendship|you'd prefer a quieter evening
I get the feeling that|tôi có cảm giác rằng|something is bothering you|this place means a lot to her|we've met somewhere before
I could be wrong|có thể tôi nhầm|, but I think that's her brother|about the date of the festival|, so let's ask someone who knows
I may be mistaken|có lẽ tôi nhớ hoặc hiểu nhầm|, but wasn't the film set in Italy?|about who told me the story|, so please correct me
I'm not completely sure|tôi chưa hoàn toàn chắc chắn|which year we first met|that I've understood your point|but I think the blue one is yours
I'm fairly sure|tôi khá chắc chắn|I've seen this picture before|we have a friend in common|that she would enjoy this book
I have no doubt that|tôi không nghi ngờ rằng|you care about your friends|she worked hard on that painting|this place holds many memories for you
That makes sense to me|điều đó có lý với tôi|because you know her better|now that you've explained it|as a way to avoid another argument
I see it differently|tôi nhìn nhận điều đó theo cách khác|because my experience was different|but I'd like to hear your reasons|when I think about how she felt
I'm not convinced that|tôi chưa thấy đủ thuyết phục rằng|bigger always means better|he meant to be unkind|this is the only way to decide
I wouldn't say that|tôi không hẳn đồng ý nhận xét đó|the film was boring|everyone feels the same way|it's a waste of time
I suppose so|tôi nghĩ có lẽ là vậy|, although I hadn't thought about it before|if everyone else is happy with the idea|, but I'd still like to ask her
That depends on|điều đó còn phụ thuộc vào|how much time we have|what kind of stories you enjoy|whether you'd like some company
It's hard to say|khó nói chắc được|which version I like more|how she'll feel about the surprise|without hearing both sides
I can understand both sides|tôi có thể hiểu quan điểm của cả hai bên|of the argument|even though I have my own preference|after hearing what they each said
There's some truth in that|điều đó có một phần đúng|but it doesn't explain everything|when I think about my own experience|even if I wouldn't say it that way
I hadn't thought of it that way|trước đó tôi chưa nghĩ theo hướng đó|until you explained your reasons|but I can see your point now|when I first heard the story
You've given me something to think about|bạn đã cho tôi một điều đáng suy nghĩ|before I make my choice|with that question about friendship|and I'd like to talk again later
We don't have to agree on everything|chúng ta không cần đồng ý về mọi thứ|to enjoy spending time together|as long as we listen to each other|because we have different experiences
@Xin lỗi và sửa hiểu lầm|nhận lỗi và giải thích ý định trong giao tiếp|5
I'm sorry about|tôi xin lỗi hoặc lấy làm tiếc về|the noise we made last night|forgetting your birthday|the way I interrupted you
I'm sorry for|tôi xin lỗi vì hành động của mình|keeping you waiting outside|making that unkind comment|not calling when I said I would
I'm sorry I|tôi xin lỗi vì mình đã|forgot to bring your book|didn't recognize you at first|spoke before you finished
Sorry to bother you|xin lỗi vì làm phiền bạn|, but is this seat taken?|when you're busy, but I have a quick question|; I think I left my scarf here
Sorry to interrupt|xin lỗi vì ngắt lời|, but your phone is ringing|when you're telling your story|, but could I ask one thing?
I didn't mean to|tôi không cố ý làm điều đó|sound rude just now|leave you out of the conversation|make you feel uncomfortable
That wasn't my intention|đó không phải ý định của tôi|when I asked the question|; I wanted to include everyone|and I'm sorry it sounded that way
I didn't realize|tôi đã không nhận ra|you were still speaking|that the seat was already taken|how much that mattered to you
I should have asked|lẽ ra tôi nên hỏi trước|before borrowing your umbrella|whether you wanted to be in the photo|instead of making a guess
I should have told you|lẽ ra tôi nên nói cho bạn biết|that I was running late|about the change of plans|before inviting another person
I shouldn't have said|lẽ ra tôi không nên nói|that in front of everyone|anything about your private news|you were being silly
I got the wrong idea|tôi đã hiểu sai ý|when I read your message|about why you left early|and thought you wanted to be alone
I misunderstood what you meant|tôi đã hiểu sai điều bạn muốn nói|about meeting another day|when you said you were tired|because I only heard part of the story
I took it the wrong way|tôi đã hiểu theo hướng không đúng hoặc tiêu cực|when you said I looked different|because I was already upset|before you explained the joke
I wasn't thinking clearly|lúc đó tôi suy nghĩ chưa rõ ràng|when I answered your question|after such a stressful morning|and I spoke too quickly
I was out of line|tôi đã nói hoặc làm quá giới hạn|when I made that personal comment|and I owe you an apology|for laughing at something important to you
I owe you an apology|tôi cần phải xin lỗi bạn|for what I said yesterday|because I didn't keep my promise|after leaving without saying goodbye
Please accept my apology|mong bạn nhận lời xin lỗi của tôi|for the misunderstanding|for missing your celebration|; I know my comment was hurtful
I hope you can forgive me|tôi mong bạn có thể tha lỗi|for forgetting something so important|when you're ready to talk|for not being there when I promised
How can I make it up to you|tôi có thể làm gì để bù lại cho bạn|after missing your birthday?|for breaking your favorite cup?|now that I've let you down?
Let me make it up to you|hãy để tôi bù lại cho bạn|by cooking dinner this weekend|the next time we meet|because I know you waited a long time
It won't happen again|điều đó sẽ không lặp lại|; I'll ask before using your things|because I'll check the time more carefully|; I'll keep that story private
No need to apologize|không cần phải xin lỗi đâu|; I know you were trying to help|for asking a simple question|because you haven't done anything wrong
No hard feelings|không còn giận hoặc để bụng đâu|; we all make mistakes|about what happened yesterday|, and I'd still like to come along
Let's put it behind us|hãy bỏ qua chuyện đã xảy ra và bước tiếp|now that we've talked honestly|and enjoy the rest of the evening|instead of arguing about it again
@Cảm ơn và đáp lại|bày tỏ sự biết ơn một cách tự nhiên|5
Thanks for listening|cảm ơn vì đã lắng nghe|when I needed to talk|to such a long story|without judging me
Thanks for checking in|cảm ơn vì đã hỏi thăm|while I was away|; it was lovely to hear from you|and remembering that today was important
Thanks for letting me know|cảm ơn vì đã báo cho tôi biết|about the new meeting place|that you arrived safely|before I left the house
Thanks for the heads-up|cảm ơn vì đã báo trước điều cần biết|about the noisy road outside|that the entrance has changed|; I'll bring a warmer coat
Thank you for having me|cảm ơn vì đã mời và đón tiếp tôi|in your home this evening|; I had a lovely time|at your family celebration
Thanks for inviting me|cảm ơn vì đã mời tôi|to join your friends|even though we only met recently|; I'm looking forward to it
Thanks for thinking of me|cảm ơn vì đã nhớ hoặc quan tâm đến tôi|when you saw this book|for the extra concert ticket|on such a busy day
Thanks for being there|cảm ơn vì đã có mặt và ở bên|when I felt alone|at my first performance|even when I didn't know what to say
Thanks for your patience|cảm ơn vì đã kiên nhẫn|while I found the right words|with my many questions|as I learned the rules
Thanks for understanding|cảm ơn vì đã thông cảm|why I need to leave early|that I can't come this time|when I changed my plans
I really appreciate it|tôi thực sự trân trọng sự giúp đỡ đó|because you went out of your way|when you make time for me|after such a difficult week
I appreciate your help|tôi trân trọng sự giúp đỡ của bạn|with the decorations|more than I can say|in finding my missing dog
I appreciate you taking the time|tôi trân trọng việc bạn dành thời gian|to explain that to me|to come and see my painting|to listen when you're so busy
That's very kind of you|bạn thật tốt khi làm như vậy|to bring something for everyone|but you really don't have to|when we've only just met
That's so thoughtful|điều đó thật chu đáo|of you to remember my favorite color|; you knew exactly what I needed|because you noticed I was feeling quiet
You shouldn't have|bạn thật chu đáo, không cần tặng nhiều như vậy đâu|bought me such a lovely gift|gone to so much trouble for my birthday|spent so much, but thank you
You really helped me out|bạn đã giúp tôi rất nhiều trong lúc cần|when I lost my keys|by looking after the cat|and I won't forget it
I couldn't have done it without you|tôi không thể làm được nếu thiếu bạn|helping me practice|there to encourage me|because I was ready to give up
I'm grateful for|tôi biết ơn vì|the time we've spent together|all the support from my friends|having someone I can talk to
I don't know how to thank you|tôi không biết phải cảm ơn thế nào cho đủ|for finding my old photo album|after everything you've done|for making this day so special
You're very welcome|rất sẵn lòng, không có gì đâu|; I'm glad I could help|and I hope you enjoy the book|; it was lovely to have you here
I'm glad I could help|tôi vui vì đã có thể giúp|you find the right place|even in a small way|with something that mattered to you
It was the least I could do|đó là điều tối thiểu tôi có thể làm để giúp|after all your kindness|when you needed a little support|because you've helped me so often
You'd do the same for me|bạn cũng sẽ giúp tôi như vậy thôi|if I needed a hand|and that's what friends are for|so there's no need to thank me again
Happy to help|tôi rất sẵn lòng giúp|whenever you need another listener|with the preparations next time|; just let me know what you need
@Làm rõ và lịch sự trong hội thoại|hỏi lại hoặc nói rõ ý khi giao tiếp|5
Could you say that again|bạn có thể nói lại điều đó không|a little more slowly?|so I can write the name down?|because I didn't hear the last part?
Could you speak a little slower|bạn có thể nói chậm hơn một chút không|so I can follow the story?|when you say the address?|because I'm still learning English?
I didn't catch|tôi nghe chưa rõ một phần lời nói|your name the first time|the last word you said|what you said about the time
I didn't quite hear|tôi chưa nghe rõ|which street you mentioned|the beginning of your question|what she said over the noise
What does that mean|điều đó có nghĩa là gì|in everyday English?|when someone says it to a friend?|in the story you just told?
Could you be more specific|bạn có thể nói cụ thể hơn không|about which entrance we should use?|when you describe the problem?|about what you would like to change?
Could you give me an example|bạn có thể cho tôi một ví dụ không|of how you use that phrase?|so I can understand the difference?|from your own experience?
Let me put it another way|để tôi diễn đạt theo cách khác|so my meaning is clearer|: I'd like a little more time|because that sounded confusing
What I'm trying to say is|điều tôi đang muốn nói là|that I miss spending time with you|that everyone should feel welcome|that I'm grateful for your advice
What I meant was|ý tôi vừa muốn nói là|that we could meet another day|that the color looked different in the photo|that I needed a short break
That's not quite what I meant|đó chưa đúng ý tôi muốn nói|when I said I was busy|so let me try again|about making a smaller plan
Let me explain|để tôi giải thích|why I felt uncomfortable|what happened before you arrived|how I know your cousin
Just to be clear|để nói cho rõ hoặc kiểm tra lại cách hiểu|, are we meeting at your place?|, I enjoyed the evening very much|, you don't need to bring anything
If I understand correctly|nếu tôi hiểu đúng|, you'd like some time to think|, the invitation is for both of us|, we can choose either day
Do you mean that|ý bạn có phải là|you've already seen the film?|we should wait outside?|you'd like to invite everyone?
Am I saying that right|tôi nói hoặc phát âm như vậy có đúng không|when I pronounce your name?|for this situation?|or is there a more natural phrase?
Could you spell that out|bạn có thể đánh vần rõ từng chữ không|so I can write your surname correctly?|for me before I enter the address?|because I missed the last two letters?
What's the word for|từ chỉ thứ này là gì|this kind of feeling in English?|someone who always arrives early?|the small room beside the kitchen?
I can't remember the word|tôi chưa nhớ ra từ cần dùng|but I can describe the idea|for the thing I'm pointing at|even though I used it yesterday
How can I put this|tôi nên diễn đạt chuyện này thế nào nhỉ|without sounding unkind?|in a simpler way?|so you understand how I feel?
I don't know the exact word|tôi không biết từ chính xác|but it means feeling happy and sad together|for this part of the picture|so I'll try to explain it differently
Please correct me if I'm wrong|hãy sửa giúp nếu tôi nói sai|about how your name is pronounced|, but I think we met last summer|when I describe what happened
Does that answer your question|điều đó đã trả lời câu hỏi của bạn chưa|about where I grew up?|or would you like another example?|about how we first met?
Have I understood you correctly|tôi đã hiểu đúng ý bạn chưa|about the change of plans?|or have I missed something?|when you say you'd prefer to stay home?
Now I understand|bây giờ tôi đã hiểu|why that was important to you|what you meant by a small gathering|after hearing your example
"""

def build():
    records = []
    topic = usage = ''
    frequency = 5
    for line in SOURCE.strip().splitlines():
        if line.startswith('@'):
            topic, usage, band = line[1:].split('|')
            frequency = int(band)
            continue
        if not line.strip():
            continue
        chunk, meaning, *tails = line.split('|')
        assert len(tails) == 3, line
        examples = []
        for tail in tails:
            separator = '' if tail.startswith((',', ';', ':')) else ' '
            sentence = chunk + separator + tail
            if sentence[-1] not in '.!?':
                sentence += '.'
            examples.append(sentence)
        records.append(dict(id=f'general-{751 + len(records):04d}', category='Everyday', chunk=chunk, explanation=f'{meaning[0].upper() + meaning[1:]}. Dùng để {usage}.', examples=examples, frequency=frequency, topic=topic))
    for item in records:
        item["frequency"] = frequency_for(item)
    assert len(records) == 200, len(records)
    assert len({item['chunk'].casefold() for item in records}) == 200
    return records

if __name__ == '__main__':
    target = Path(__file__).resolve().parents[2] / 'src/content/chunks/work-social-extra.json'
    target.write_text(json.dumps(build(), ensure_ascii=False, indent=2) + '\n')
    print('Wrote 200 everyday social chunks.')
