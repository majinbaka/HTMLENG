// Original fictional workplace simulations; not technical operating instructions.
window.SpeakSprintWorkplaceData = {
  "id": "workplace-communication",
  "category": "Chủ đề lớn · Làm việc",
  "title": "Làm việc · Trao đổi trong dự án phần mềm",
  "description": "14 buổi thực hành từ kickoff, yêu cầu, daily meeting, kỹ thuật và QA đến báo cáo, phân chia việc, quản lý, release và sự cố. Cùng một dự án, nhiều vai trò, đầu ra dùng được trong công việc.",
  "tags": [
    "Daily meeting",
    "Kỹ thuật & dự án",
    "Báo cáo & phân công",
    "Quản lý & vận hành"
  ],
  "overview": "Theo dự án Customer Import: PM Mai, backend Linh, frontend An và QA Bao. Mỗi buổi có ticket, dữ kiện, thời hạn và quyết định cần chốt. Tất cả là mô phỏng; hãy thay bằng công việc thật khi phù hợp. Mỗi buổi 30–40 phút, câu mẫu A2–B1 kèm nghĩa tiếng Việt. Buổi 7 và 14 chỉ ôn 5 chunk cũ.",
  "stages": [
    "01 · Khởi động & phối hợp hằng ngày",
    "02 · Kỹ thuật, chất lượng & demo",
    "03 · Kế hoạch, báo cáo & thay đổi",
    "04 · Vận hành, quản lý & mô phỏng"
  ],
  "sessions": [
    {
      "id": "project-kickoff",
      "title": "01 · Kickoff: thống nhất mục tiêu dự án",
      "stage": 0,
      "mission": "Chốt mục tiêu, vai trò và bước tiếp theo cho tính năng nhập khách hàng. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Dự án giả định: Customer Import cho trang quản trị. Mai là PM, Linh là backend developer (bạn), An là frontend developer, Bao phụ trách QA. Ticket IMP-101; demo nội bộ thứ Sáu 15:00; chưa cam kết ngày phát hành.",
      "input": "Mai: We want support staff to import customer records instead of typing them one by one. The goal is to save time on small customer lists.\nLinh: Who will use this? Is it only our support team in the first version?\nMai: Yes. We will show an internal demo on Friday at three. That is not a release date.\nLinh: I will take care of the upload API. An can build the screen, and Bao can test the flow. What does success look like for the demo?\nMai: A support user uploads our sample file and sees which rows failed. We still need to agree on the file limit.\nLinh: Let me confirm the next step. I will write the open questions in IMP-101 today. Can you review them before tomorrow's planning meeting?",
      "chunks": [
        {
          "id": "work-c1",
          "text": "The goal is to …",
          "meaning": "Mục tiêu là…",
          "use": "Mở kickoff bằng lợi ích cho người dùng",
          "pattern": "The goal is to + verb",
          "simple": "The goal is to save time.",
          "example": "The goal is to reduce manual customer entry."
        },
        {
          "id": "work-c2",
          "text": "Who will …?",
          "meaning": "Ai sẽ…?",
          "use": "Hỏi rõ người dùng hoặc người làm bước tiếp theo",
          "pattern": "Who will + verb?",
          "simple": "Who will join the call?",
          "example": "Who will use the import screen?"
        },
        {
          "id": "work-c3",
          "text": "I will take care of …",
          "meaning": "Tôi sẽ phụ trách…",
          "use": "Nhận một phần việc có đầu ra rõ",
          "pattern": "I will take care of + noun",
          "simple": "I will take care of the notes.",
          "example": "I will take care of the upload API."
        },
        {
          "id": "work-c4",
          "text": "What does success look like …?",
          "meaning": "Kết quả đạt yêu cầu là gì…?",
          "use": "Làm rõ thế nào là demo đạt yêu cầu",
          "pattern": "What does success look like + for this demo?",
          "simple": "What does success look like for this task?",
          "example": "What does success look like for the import demo?"
        },
        {
          "id": "work-c5",
          "text": "Let me confirm …",
          "meaning": "Để tôi xác nhận…",
          "use": "Đọc lại điều đã thống nhất trước khi kết thúc",
          "pattern": "Let me confirm + noun/clause",
          "simple": "Let me confirm the time.",
          "example": "Let me confirm the next step for IMP-101."
        }
      ],
      "terms": [
        {
          "term": "kickoff",
          "meaning": "buổi khởi động",
          "usage": "We have a project kickoff today.",
          "pitfall": "Không dùng kickoff để nói dự án đã hoàn thành."
        },
        {
          "term": "scope",
          "meaning": "phạm vi",
          "usage": "The first version has a small scope.",
          "pitfall": "Scope nói về phần việc được bao gồm, không phải lịch."
        },
        {
          "term": "owner",
          "meaning": "người chịu trách nhiệm",
          "usage": "Linh is the API owner.",
          "pitfall": "Owner ở đây không phải chủ sở hữu công ty."
        },
        {
          "term": "demo",
          "meaning": "buổi trình diễn",
          "usage": "The internal demo is on Friday.",
          "pitfall": "Demo không đồng nghĩa đã phát hành."
        },
        {
          "term": "open question",
          "meaning": "điểm cần làm rõ",
          "usage": "The file limit is an open question.",
          "pitfall": "Cần ghi người trả lời và thời điểm chốt."
        }
      ],
      "checks": [
        {
          "question": "Who is the first version for?",
          "model": "It is for the internal support team."
        },
        {
          "question": "What must the demo show?",
          "model": "Upload the sample file and show failed rows."
        },
        {
          "question": "Why is Friday not a customer promise?",
          "model": "Friday is an internal demo, not a release date."
        }
      ],
      "followups": [
        "Mai (PM): Can you describe the user problem in one sentence?",
        "An (frontend): What will you own, and what do you need from me?",
        "Bao (QA): What will I be able to test on Friday?",
        "Mai: Can we tell customers it will be live on Friday?",
        "Support: Can external customers use it too? Explain what is still outside the agreed scope.",
        "Mai: Please close the meeting with the action owner and review time."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Dự án giả định: Customer Import cho trang quản trị. Mai là PM, Linh là backend developer (bạn), An là frontend developer, Bao phụ trách QA. Ticket IMP-101; demo nội bộ thứ Sáu 15:00; chưa cam kết ngày phát hành.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "The goal is to reduce manual customer entry. / Who will use the import screen? / I will take care of the upload API.",
      "grammar": "will + động từ nguyên mẫu để nhận việc: I will write the notes. Câu hỏi: Who will review them?",
      "artifact": "Viết recap kickoff 4 dòng: Goal / Demo scope / Open question + owner / Next meeting. Ghi rõ Friday 15:00 là demo nội bộ.",
      "quiz": [
        {
          "question": "A stakeholder calls Friday a release date. What do you say?",
          "options": [
            "Friday is the internal demo; we still need a release decision.",
            "Yes, the demo means it is ready for all customers.",
            "We do not need to discuss dates."
          ],
          "answer": 0,
          "explanation": "Phân biệt demo và release để tránh tạo cam kết chưa có."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon."
          ],
          "answer": 1,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "requirements-acceptance",
      "title": "02 · Làm rõ yêu cầu & tiêu chí nghiệm thu",
      "stage": 0,
      "mission": "Làm rõ file CSV, dòng lỗi và việc trùng email trước khi triển khai. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "IMP-102: PM đề xuất tối đa 500 dòng, cột name/email. Chưa thống nhất email trùng trong cùng file. Cần quyết định trước 16:00 để viết test.",
      "input": "Linh: Could you clarify what happens when one row has no email? At the moment, the ticket only says “show an error.”\nMai: Valid rows should still be imported. The user needs the row number and a short reason for each failed row.\nLinh: Does that include duplicate emails in the same file?\nMai: We have not decided that yet. Please mark it as an open question.\nBao: The acceptance criteria are a limit of five hundred rows, required names and emails, and visible reasons for rejected rows.\nLinh: For example, if row eight has no email, the result should identify row eight. Is that correct?\nMai: Yes. I will ask support about duplicates by four.\nLinh: This is out of scope for this version: importing phone numbers. I will update IMP-102 after your answer.",
      "chunks": [
        {
          "id": "work-c6",
          "text": "Could you clarify …?",
          "meaning": "Bạn làm rõ giúp…?",
          "use": "Hỏi khi yêu cầu còn mơ hồ",
          "pattern": "Could you clarify + noun/clause?",
          "simple": "Could you clarify the deadline?",
          "example": "Could you clarify what happens when a row has no email?"
        },
        {
          "id": "work-c7",
          "text": "Does that include …?",
          "meaning": "Việc đó có bao gồm…?",
          "use": "Kiểm tra một trường hợp có thuộc phạm vi không",
          "pattern": "Does that include + noun/V-ing?",
          "simple": "Does that include testing?",
          "example": "Does that include duplicate emails in the same file?"
        },
        {
          "id": "work-c8",
          "text": "The acceptance criteria are …",
          "meaning": "Các tiêu chí nghiệm thu là…",
          "use": "Chốt điều kiện có thể kiểm thử",
          "pattern": "The acceptance criteria are + list",
          "simple": "The acceptance criteria are listed here.",
          "example": "The acceptance criteria are a row limit and clear error messages."
        },
        {
          "id": "work-c9",
          "text": "For example, if …",
          "meaning": "Ví dụ, nếu…",
          "use": "Đưa input và kết quả để xác nhận cách hiểu",
          "pattern": "For example, if + present, + result",
          "simple": "For example, if it fails, we show a message.",
          "example": "For example, if row eight has no email, we show its row number."
        },
        {
          "id": "work-c10",
          "text": "This is out of scope …",
          "meaning": "Việc này ngoài phạm vi…",
          "use": "Từ chối phần ngoài phạm vi một cách rõ ràng",
          "pattern": "This is out of scope + for this version",
          "simple": "This is out of scope for today.",
          "example": "This is out of scope for this version: importing phone numbers."
        }
      ],
      "terms": [
        {
          "term": "acceptance criteria",
          "meaning": "tiêu chí nghiệm thu",
          "usage": "We agreed on the acceptance criteria.",
          "pitfall": "Criteria là số nhiều; một tiêu chí là criterion."
        },
        {
          "term": "required field",
          "meaning": "trường bắt buộc",
          "usage": "Email is a required field.",
          "pitfall": "Required không có nghĩa chỉ nên điền."
        },
        {
          "term": "duplicate",
          "meaning": "bản/dữ liệu trùng",
          "usage": "There are duplicate emails.",
          "pitfall": "Nêu trùng trong file hay trùng dữ liệu đã có."
        },
        {
          "term": "reject",
          "meaning": "từ chối",
          "usage": "Reject rows without an email.",
          "pitfall": "Phân biệt từ chối một dòng với cả file."
        },
        {
          "term": "row limit",
          "meaning": "giới hạn số dòng",
          "usage": "The row limit is five hundred.",
          "pitfall": "Row là dòng dữ liệu, không phải kích thước byte."
        }
      ],
      "checks": [
        {
          "question": "What happens to valid rows?",
          "model": "They are still imported."
        },
        {
          "question": "What decision is still open?",
          "model": "The rule for duplicate emails in one file is still open."
        },
        {
          "question": "What will Mai do by four?",
          "model": "Mai will ask support about duplicates."
        }
      ],
      "followups": [
        "Bao: What should happen if row eight is missing an email?",
        "An: Should I show only “Import failed”?",
        "Mai: What do you mean by a duplicate? Ask one precise question.",
        "Support: Can we import phone numbers in this version?",
        "Bao: Can I write the duplicate test now? Explain what is confirmed.",
        "Mai: Summarize the criteria and the open decision before we close."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "IMP-102: PM đề xuất tối đa 500 dòng, cột name/email. Chưa thống nhất email trùng trong cùng file. Cần quyết định trước 16:00 để viết test.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "Could you clarify what happens when a row has no email? / Does that include duplicate emails in the same file? / The acceptance criteria are a row limit and clear error messages.",
      "grammar": "if + hiện tại để diễn đạt trường hợp kiểm thử: If a row has no email, show its row number.",
      "artifact": "Viết comment IMP-102: 3 tiêu chí có thể kiểm thử và 1 câu hỏi về duplicate, kèm người trả lời/hạn 16:00.",
      "quiz": [
        {
          "question": "The duplicate rule is undecided. What should you write?",
          "options": [
            "There are no open questions.",
            "The duplicate rule is open; Mai will confirm it by 16:00.",
            "Duplicate rows will always be deleted."
          ],
          "answer": 1,
          "explanation": "Không tự biến yêu cầu chưa chốt thành quy tắc đã xác nhận."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket."
          ],
          "answer": 2,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "daily-standup",
      "title": "03 · Daily meeting: tiến độ, blocker & nhờ hỗ trợ",
      "stage": 0,
      "mission": "Báo cáo ngắn và nhờ đúng người tháo gỡ một blocker. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Thứ Ba 09:15, IMP-103: validation đã xong ở local; chưa tích hợp API với UI vì thiếu sample lỗi từ QA. Bao dự kiến gửi sample lúc 11:00. Daily chỉ 10 phút.",
      "input": "Mai: Let's keep the daily short. Linh, how is IMP-103 going?\nLinh: Yesterday, I finished the validation checks on my machine. Today, I am working on the error response. I am blocked by the missing sample file, so I cannot check the screen with An yet.\nBao: I can send a file with three invalid rows by eleven.\nLinh: Could you help me with one duplicate row as well? We need to check the new rule from support.\nBao: Yes, I will include that case.\nAn: Can we discuss the response fields now?\nLinh: Let's take this offline after the daily. The field names need ten minutes, and the rest of the team does not need to stay.\nMai: Good. Please post the integration result in IMP-103 before three, or update us if the sample is late.",
      "chunks": [
        {
          "id": "work-c11",
          "text": "Yesterday, I finished …",
          "meaning": "Hôm qua tôi đã xong…",
          "use": "Báo việc đã làm; kèm môi trường hoặc bằng chứng",
          "pattern": "Yesterday, I finished + noun/V-ing",
          "simple": "Yesterday, I finished the notes.",
          "example": "Yesterday, I finished the local validation checks."
        },
        {
          "id": "work-c12",
          "text": "Today, I am working on …",
          "meaning": "Hôm nay tôi đang làm…",
          "use": "Báo trọng tâm hôm nay",
          "pattern": "Today, I am working on + noun",
          "simple": "Today, I am working on a fix.",
          "example": "Today, I am working on the error response."
        },
        {
          "id": "work-c13",
          "text": "I am blocked by …",
          "meaning": "Tôi đang bị chặn bởi…",
          "use": "Chỉ ra thứ đang chặn bước tiếp theo",
          "pattern": "I am blocked by + noun",
          "simple": "I am blocked by missing access.",
          "example": "I am blocked by the missing sample file."
        },
        {
          "id": "work-c14",
          "text": "Could you help me with …?",
          "meaning": "Bạn giúp tôi phần… được không?",
          "use": "Nhờ một người giúp việc cụ thể",
          "pattern": "Could you help me with + noun?",
          "simple": "Could you help me with this test?",
          "example": "Could you help me with a duplicate row in the sample?"
        },
        {
          "id": "work-c15",
          "text": "Let's take this offline …",
          "meaning": "Trao đổi riêng sau buổi này…",
          "use": "Tách thảo luận dài ra khỏi daily",
          "pattern": "Let's take this offline + time",
          "simple": "Let's take this offline after the call.",
          "example": "Let's take this offline after the daily with An."
        }
      ],
      "terms": [
        {
          "term": "standup",
          "meaning": "họp cập nhật ngắn",
          "usage": "We have a standup at 09:15.",
          "pitfall": "Không cần hiểu là bắt buộc đứng."
        },
        {
          "term": "blocker",
          "meaning": "trở ngại chặn tiến độ",
          "usage": "The missing sample is a blocker.",
          "pitfall": "Nêu blocker chặn bước nào, không chỉ nói có vấn đề."
        },
        {
          "term": "local",
          "meaning": "trên máy cá nhân",
          "usage": "The checks pass locally.",
          "pitfall": "Local pass chưa chứng minh staging pass."
        },
        {
          "term": "sample file",
          "meaning": "file mẫu",
          "usage": "Bao will send a sample file.",
          "pitfall": "Nêu cần case gì trong file."
        },
        {
          "term": "integration",
          "meaning": "tích hợp",
          "usage": "We will test the integration today.",
          "pitfall": "Không chỉ kiểm thử riêng từng phần."
        }
      ],
      "checks": [
        {
          "question": "What is already finished?",
          "model": "The validation checks are finished locally."
        },
        {
          "question": "What blocks the UI check?",
          "model": "The missing sample file blocks it."
        },
        {
          "question": "Why move the field discussion after the daily?",
          "model": "It needs ten minutes and only some team members."
        }
      ],
      "followups": [
        "Mai: Give your update in three sentences.",
        "Bao: Which exact cases do you need in the sample?",
        "An: Does “finished” mean the UI already works?",
        "Bao: The sample will be two hours late. What can you do meanwhile?",
        "Mai: Can we spend the next twenty minutes debugging here?",
        "An: Confirm our next check and when you will post the result."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Thứ Ba 09:15, IMP-103: validation đã xong ở local; chưa tích hợp API với UI vì thiếu sample lỗi từ QA. Bao dự kiến gửi sample lúc 11:00. Daily chỉ 10 phút.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "Yesterday, I finished the local validation checks. / Today, I am working on the error response. / I am blocked by the missing sample file.",
      "grammar": "Yesterday + quá khứ đơn; Today + am/is/are working on. finished đi với danh từ hoặc V-ing.",
      "artifact": "Viết tin nhắn daily 4 dòng: Yesterday / Today / Blocker + request / Next update. Nêu đúng local và hạn 15:00.",
      "quiz": [
        {
          "question": "Which daily update is precise?",
          "options": [
            "Everything is done.",
            "There is a problem somewhere.",
            "Validation passes locally; the UI check is blocked by the sample file."
          ],
          "answer": 2,
          "explanation": "Báo rõ phạm vi hoàn thành và dependency còn thiếu."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed."
          ],
          "answer": 0,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "technical-design",
      "title": "04 · Trao đổi kỹ thuật: API contract & đánh đổi",
      "stage": 1,
      "mission": "So sánh hai cách xử lý import và chốt điều kiện kiểm chứng. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "IMP-104: demo dùng tối đa 500 dòng. An cần tên field kết quả trước 14:00. Nhóm chưa đo thời gian chạy và chưa quyết định xử lý trực tiếp hay nền.",
      "input": "An: I need the response fields before two. Should the screen wait for the import result?\nLinh: We have two options: return the result in one request, or return a job ID and check later. The trade-off is a simpler flow versus extra work for job status.\nBao: Do we know how long five hundred rows take?\nLinh: Not yet. My concern is that the request may take too long. I suggest we test the agreed sample before choosing the final flow.\nAn: Can we agree on the result fields now, even if timing is still unknown?\nLinh: Yes: importedCount and rowErrors. We can confirm this by running the same sample on staging and recording the response time.\nMai: Please post the result and recommendation by four. Do not call the faster option proven until we have measurements.",
      "chunks": [
        {
          "id": "work-c16",
          "text": "We have two options: …",
          "meaning": "Chúng ta có hai lựa chọn…",
          "use": "Đặt hai phương án cạnh nhau để thảo luận",
          "pattern": "We have two options: + A or B",
          "simple": "We have two options: wait or retry.",
          "example": "We have two options: return the result now or return a job ID."
        },
        {
          "id": "work-c17",
          "text": "The trade-off is …",
          "meaning": "Điều cần đánh đổi là…",
          "use": "Nêu chi phí hoặc điểm yếu đi kèm lựa chọn",
          "pattern": "The trade-off is + noun phrase",
          "simple": "The trade-off is extra work.",
          "example": "The trade-off is a simpler flow versus job-status handling."
        },
        {
          "id": "work-c18",
          "text": "My concern is that …",
          "meaning": "Điều tôi lo là…",
          "use": "Nêu rủi ro mà chưa khẳng định nó sẽ xảy ra",
          "pattern": "My concern is that + clause",
          "simple": "My concern is that we may be late.",
          "example": "My concern is that the request may take too long."
        },
        {
          "id": "work-c19",
          "text": "I suggest we …",
          "meaning": "Tôi đề nghị chúng ta…",
          "use": "Đề xuất bước thử trước khi quyết định",
          "pattern": "I suggest we + verb",
          "simple": "I suggest we test it first.",
          "example": "I suggest we measure the agreed sample on staging."
        },
        {
          "id": "work-c20",
          "text": "We can confirm this by …",
          "meaning": "Có thể kiểm chứng bằng cách…",
          "use": "Nêu phép đo để kiểm chứng ý kiến",
          "pattern": "We can confirm this by + V-ing",
          "simple": "We can confirm this by checking the file.",
          "example": "We can confirm this by recording the response time."
        }
      ],
      "terms": [
        {
          "term": "API contract",
          "meaning": "thỏa thuận cấu trúc API",
          "usage": "Agree on the API contract first.",
          "pitfall": "Không chỉ tên endpoint; gồm request, response, lỗi."
        },
        {
          "term": "response",
          "meaning": "phản hồi API",
          "usage": "The response includes rowErrors.",
          "pitfall": "Response khác request gửi vào."
        },
        {
          "term": "job ID",
          "meaning": "mã công việc chạy nền",
          "usage": "Return a job ID to the screen.",
          "pitfall": "Có ID chưa có nghĩa job đã xong."
        },
        {
          "term": "staging",
          "meaning": "môi trường thử trước production",
          "usage": "Measure the sample on staging.",
          "pitfall": "Kết quả staging chưa đảm bảo production giống hệt."
        },
        {
          "term": "trade-off",
          "meaning": "sự đánh đổi",
          "usage": "Explain the trade-off clearly.",
          "pitfall": "Không chỉ kể ưu điểm của phương án mình thích."
        }
      ],
      "checks": [
        {
          "question": "Which fields can they agree on now?",
          "model": "They can agree on importedCount and rowErrors."
        },
        {
          "question": "What is still unknown?",
          "model": "The time needed to import five hundred rows is unknown."
        },
        {
          "question": "What must Linh post by four?",
          "model": "The measurement result and a recommendation."
        }
      ],
      "followups": [
        "An: Which response fields can I use today?",
        "Mai: Why not choose a background job immediately?",
        "Bao: What exactly will you measure?",
        "An: Can I say one request is definitely faster?",
        "Mai: What happens if the test is too slow? Give a conditional next step.",
        "Bao: Who will publish the result, and by what time?"
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "IMP-104: demo dùng tối đa 500 dòng. An cần tên field kết quả trước 14:00. Nhóm chưa đo thời gian chạy và chưa quyết định xử lý trực tiếp hay nền.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "We have two options: return the result now or return a job ID. / The trade-off is a simpler flow versus job-status handling. / My concern is that the request may take too long.",
      "grammar": "suggest we + động từ nguyên mẫu: I suggest we test. Không dùng suggest we to test.",
      "artifact": "Viết decision note: Options / Chosen for test / Risk / Evidence needed / Owner + 16:00 update. Không bịa số đo.",
      "quiz": [
        {
          "question": "No timing test has run. Which claim is reasonable?",
          "options": [
            "We need a measurement before confirming the flow.",
            "This will definitely finish in one second.",
            "The job option is always faster."
          ],
          "answer": 0,
          "explanation": "Nêu rõ chưa đo, tránh khẳng định kỹ thuật không có bằng chứng."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon."
          ],
          "answer": 1,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "code-review",
      "title": "05 · Code review: góp ý & phản hồi bất đồng",
      "stage": 1,
      "mission": "Nêu một lỗi có bằng chứng, phân biệt yêu cầu sửa với gợi ý. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "PR #42 cho IMP-105: đếm cả dòng không hợp lệ vào importedCount. Comment naming chỉ là gợi ý. Merge cần QA xác nhận count chính xác.",
      "input": "Bao: I noticed that importedCount includes a row with no email. In the sample, three rows are valid, but the response says four.\nLinh: Thanks for checking. Could we change the count after validation? That should match the rows we accept.\nAn: I also left a comment about the function name. Is that blocking the merge?\nBao: This is a suggestion, not a required change. The incorrect count is the blocking issue because support will use it to check the result.\nLinh: I agree with the count fix. I see your point, but I would keep the current name in this PR so the change stays small.\nAn: That works for me.\nLinh: I have updated the PR with a test for three valid rows and one invalid row. Bao, could you check that case again before we merge?",
      "chunks": [
        {
          "id": "work-c21",
          "text": "I noticed that …",
          "meaning": "Tôi thấy rằng…",
          "use": "Mở góp ý bằng quan sát thay vì quy lỗi",
          "pattern": "I noticed that + clause",
          "simple": "I noticed that one row is missing.",
          "example": "I noticed that importedCount includes an invalid row."
        },
        {
          "id": "work-c22",
          "text": "Could we change …?",
          "meaning": "Chúng ta sửa… được không?",
          "use": "Đề nghị sửa một chi tiết trong PR",
          "pattern": "Could we change + noun?",
          "simple": "Could we change this name?",
          "example": "Could we change the count after validation?"
        },
        {
          "id": "work-c23",
          "text": "This is a suggestion, not …",
          "meaning": "Đây là gợi ý, không phải…",
          "use": "Phân biệt gợi ý với yêu cầu bắt buộc",
          "pattern": "This is a suggestion, not + noun phrase",
          "simple": "This is a suggestion, not a rule.",
          "example": "This is a suggestion, not a required change."
        },
        {
          "id": "work-c24",
          "text": "I see your point, but …",
          "meaning": "Tôi hiểu ý bạn, nhưng…",
          "use": "Thừa nhận ý kiến trước khi phản biện có lý do",
          "pattern": "I see your point, but + clause",
          "simple": "I see your point, but we need a test.",
          "example": "I see your point, but I would keep the current name in this PR."
        },
        {
          "id": "work-c25",
          "text": "I have updated …",
          "meaning": "Tôi đã cập nhật…",
          "use": "Báo thay đổi đã thực hiện để nhờ review lại",
          "pattern": "I have updated + noun",
          "simple": "I have updated the ticket.",
          "example": "I have updated the PR with a test for invalid rows."
        }
      ],
      "terms": [
        {
          "term": "pull request",
          "meaning": "yêu cầu xem xét thay đổi code",
          "usage": "Please review pull request forty-two.",
          "pitfall": "Review xong chưa chắc đã merge."
        },
        {
          "term": "blocking issue",
          "meaning": "lỗi bắt buộc xử lý trước bước tiếp",
          "usage": "The count is a blocking issue.",
          "pitfall": "Nêu vì sao chặn merge."
        },
        {
          "term": "suggestion",
          "meaning": "gợi ý",
          "usage": "The naming comment is a suggestion.",
          "pitfall": "Đừng để người nhận đoán mức bắt buộc."
        },
        {
          "term": "merge",
          "meaning": "gộp thay đổi",
          "usage": "We can merge after the count check.",
          "pitfall": "Merge không đồng nghĩa deploy."
        },
        {
          "term": "test case",
          "meaning": "trường hợp kiểm thử",
          "usage": "Add a test case for an invalid row.",
          "pitfall": "Nêu input và kết quả mong đợi."
        }
      ],
      "checks": [
        {
          "question": "Why is the count wrong?",
          "model": "It reports four although only three rows are valid."
        },
        {
          "question": "Which comment does not block merging?",
          "model": "The function-name suggestion does not block merging."
        },
        {
          "question": "What is needed before merging?",
          "model": "Bao must check the count case again."
        }
      ],
      "followups": [
        "Bao: Explain the bug without blaming the author.",
        "An: Is my naming comment required for this merge?",
        "Reviewer: Why do you want to keep the current name?",
        "Bao: What input and expected count should the test use?",
        "Mai: Can we merge without checking the updated count?",
        "Reviewer: Close the thread with what changed and what still needs review."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "PR #42 cho IMP-105: đếm cả dòng không hợp lệ vào importedCount. Comment naming chỉ là gợi ý. Merge cần QA xác nhận count chính xác.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "I noticed that importedCount includes an invalid row. / Could we change the count after validation? / This is a suggestion, not a required change.",
      "grammar": "I have updated + danh từ để báo thay đổi đã làm, hiện cần người khác review.",
      "artifact": "Viết 2 comment PR: một lỗi chặn merge có observed/expected; một phản hồi lịch sự cho gợi ý naming.",
      "quiz": [
        {
          "question": "What should block this PR?",
          "options": [
            "Nothing; review comments never matter.",
            "The incorrect importedCount, until the test is checked.",
            "Every optional naming suggestion."
          ],
          "answer": 1,
          "explanation": "Lỗi ảnh hưởng kết quả cần xử lý, gợi ý naming không tự động thành blocker."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket."
          ],
          "answer": 2,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "qa-handoff",
      "title": "06 · QA: tái hiện lỗi & bàn giao kiểm thử",
      "stage": 1,
      "mission": "Viết bug report có thể tái hiện và chốt bằng chứng để đóng lỗi. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "IMP-106 trên staging: kết quả hiện 3 imported, 1 failed nhưng tải file lỗi thiếu row number. Chrome, file sample-v2.csv, build demo-6. Bao chờ bản sửa trước 16:30.",
      "input": "Bao: I can reproduce the issue on staging with sample-v2.csv. The screen shows three imported rows and one failed row, but the downloaded error file has no row number.\nLinh: What should happen in that file?\nBao: The expected result is row four with “email is required.” The actual result is the message without a row number.\nLinh: Can you share the steps to reproduce? Please include the build and browser so I can use the same setup.\nBao: Open the import page, upload the sample, and download the error file. I used Chrome and build demo-6.\nLinh: Thanks. I will check the file output and send a new build before four thirty. Please retest after I post the build number. If it passes, attach the new file to IMP-106 before closing it.",
      "chunks": [
        {
          "id": "work-c26",
          "text": "I can reproduce …",
          "meaning": "Tôi tái hiện được…",
          "use": "Xác nhận đã tái hiện lỗi trong môi trường cụ thể",
          "pattern": "I can reproduce + noun",
          "simple": "I can reproduce the error.",
          "example": "I can reproduce the issue on staging with sample-v2.csv."
        },
        {
          "id": "work-c27",
          "text": "The expected result is …",
          "meaning": "Kết quả mong đợi là…",
          "use": "Nêu hành vi đúng theo yêu cầu",
          "pattern": "The expected result is + noun phrase",
          "simple": "The expected result is a clear message.",
          "example": "The expected result is row four with an email error."
        },
        {
          "id": "work-c28",
          "text": "The actual result is …",
          "meaning": "Kết quả thực tế là…",
          "use": "Nêu hành vi thực sự quan sát được",
          "pattern": "The actual result is + noun phrase",
          "simple": "The actual result is an empty file.",
          "example": "The actual result is a message without a row number."
        },
        {
          "id": "work-c29",
          "text": "Can you share the steps to …?",
          "meaning": "Bạn gửi các bước để… được không?",
          "use": "Xin các bước giúp người khác tái hiện",
          "pattern": "Can you share the steps to + verb?",
          "simple": "Can you share the steps to test it?",
          "example": "Can you share the steps to reproduce the missing row number?"
        },
        {
          "id": "work-c30",
          "text": "Please retest after …",
          "meaning": "Hãy kiểm thử lại sau khi…",
          "use": "Bàn giao kiểm thử lại sau khi có bản sửa",
          "pattern": "Please retest after + clause",
          "simple": "Please retest after I send the fix.",
          "example": "Please retest after I post the new build number."
        }
      ],
      "terms": [
        {
          "term": "reproduce",
          "meaning": "tái hiện",
          "usage": "I can reproduce the missing row number.",
          "pitfall": "Không chỉ nói đã thấy lỗi một lần."
        },
        {
          "term": "expected result",
          "meaning": "kết quả mong đợi",
          "usage": "Write the expected result in the ticket.",
          "pitfall": "Phải dựa trên yêu cầu đã chốt."
        },
        {
          "term": "actual result",
          "meaning": "kết quả quan sát thực tế",
          "usage": "Attach the actual result.",
          "pitfall": "Không viết phỏng đoán nguyên nhân vào actual result."
        },
        {
          "term": "build",
          "meaning": "bản dựng",
          "usage": "Retest build demo-7.",
          "pitfall": "Nêu build cụ thể để tránh test bản cũ."
        },
        {
          "term": "retest",
          "meaning": "kiểm thử lại phần đã sửa",
          "usage": "Please retest the error download.",
          "pitfall": "Retest pass không có nghĩa mọi flow khác đều pass."
        }
      ],
      "checks": [
        {
          "question": "Where is the row number missing?",
          "model": "It is missing in the downloaded error file."
        },
        {
          "question": "Which setup did Bao use?",
          "model": "Chrome, staging, sample-v2.csv and build demo-6."
        },
        {
          "question": "What evidence should be attached before closing?",
          "model": "The new downloaded file should be attached after the retest passes."
        }
      ],
      "followups": [
        "Bao: Tell me the observed and expected results separately.",
        "Linh: Which environment, build and sample did you use?",
        "Mai: Does this mean all imports are failing?",
        "Bao: I cannot retest before 16:30. How will you update the plan?",
        "An: Can we close the ticket because the code is changed?",
        "Bao: Write the handoff with the build, steps and evidence needed."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "IMP-106 trên staging: kết quả hiện 3 imported, 1 failed nhưng tải file lỗi thiếu row number. Chrome, file sample-v2.csv, build demo-6. Bao chờ bản sửa trước 16:30.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "I can reproduce the issue on staging with sample-v2.csv. / The expected result is row four with an email error. / The actual result is a message without a row number.",
      "grammar": "after + mệnh đề: Please retest after I post the build. Dùng hiện tại trong mệnh đề thời gian này.",
      "artifact": "Viết bug report IMP-106: Environment / Steps / Expected / Actual / Attachment needed. Sau đó thêm một câu bàn giao retest.",
      "quiz": [
        {
          "question": "When should IMP-106 be closed?",
          "options": [
            "As soon as the developer changes code.",
            "When the old build still fails.",
            "After the new build is retested and the result file is attached."
          ],
          "answer": 2,
          "explanation": "Đóng lỗi dựa trên kết quả kiểm chứng của bản sửa."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed."
          ],
          "answer": 0,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "delivery-rehearsal",
      "title": "07 · Ôn tổng hợp: họp trước demo",
      "stage": 1,
      "mission": "Chạy một cuộc họp chốt demo với PM, frontend và QA bằng 5 chunk cũ. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Thứ Năm 14:00: sample đã tới; count đã sửa; file lỗi đang chờ retest. Demo thứ Sáu 15:00. Chỉ giới thiệu luồng đã xác nhận; chưa có quyết định release.",
      "input": "Mai: We have the internal demo tomorrow. What is ready, and what still needs a decision?\nLinh: Let me confirm the current scope. We will show the sample upload and the row results. I have updated the count fix, and Bao has checked it.\nBao: The downloaded error file still needs a retest. I can do that at three today.\nAn: Could you help me with the demo data? I need a clean file and one with an invalid email.\nLinh: Yes. My concern is that we may describe the download as ready before that retest passes.\nMai: Then keep that part conditional. What should we tell support?\nLinh: The expected result is a row number and a reason in the error file. We will confirm it after Bao's check and update the demo notes by four. Friday is still an internal demo, not a customer release.",
      "chunks": [
        {
          "id": "work-c5",
          "text": "Let me confirm …",
          "meaning": "Để tôi xác nhận…",
          "use": "Đọc lại điều đã thống nhất trước khi kết thúc",
          "pattern": "Let me confirm + noun/clause",
          "simple": "Let me confirm the time.",
          "example": "Let me confirm the next step for IMP-101."
        },
        {
          "id": "work-c25",
          "text": "I have updated …",
          "meaning": "Tôi đã cập nhật…",
          "use": "Báo thay đổi đã thực hiện để nhờ review lại",
          "pattern": "I have updated + noun",
          "simple": "I have updated the ticket.",
          "example": "I have updated the PR with a test for invalid rows."
        },
        {
          "id": "work-c14",
          "text": "Could you help me with …?",
          "meaning": "Bạn giúp tôi phần… được không?",
          "use": "Nhờ một người giúp việc cụ thể",
          "pattern": "Could you help me with + noun?",
          "simple": "Could you help me with this test?",
          "example": "Could you help me with a duplicate row in the sample?"
        },
        {
          "id": "work-c18",
          "text": "My concern is that …",
          "meaning": "Điều tôi lo là…",
          "use": "Nêu rủi ro mà chưa khẳng định nó sẽ xảy ra",
          "pattern": "My concern is that + clause",
          "simple": "My concern is that we may be late.",
          "example": "My concern is that the request may take too long."
        },
        {
          "id": "work-c27",
          "text": "The expected result is …",
          "meaning": "Kết quả mong đợi là…",
          "use": "Nêu hành vi đúng theo yêu cầu",
          "pattern": "The expected result is + noun phrase",
          "simple": "The expected result is a clear message.",
          "example": "The expected result is row four with an email error."
        }
      ],
      "terms": [
        {
          "term": "demo notes",
          "meaning": "ghi chú trình diễn",
          "usage": "Update the demo notes by four.",
          "pitfall": "Ghi rõ điều đã kiểm chứng và điều chưa chắc."
        },
        {
          "term": "conditional",
          "meaning": "có điều kiện",
          "usage": "The download demo is conditional on retesting.",
          "pitfall": "Không phải cam kết chắc chắn."
        },
        {
          "term": "retest",
          "meaning": "kiểm thử lại",
          "usage": "The download needs a retest.",
          "pitfall": "Ôn lại từ buổi QA."
        },
        {
          "term": "scope",
          "meaning": "phạm vi",
          "usage": "Confirm the demo scope.",
          "pitfall": "Ôn lại từ kickoff; không thêm tính năng ngoài chốt."
        },
        {
          "term": "evidence",
          "meaning": "bằng chứng",
          "usage": "Attach the test evidence.",
          "pitfall": "Đưa file hoặc kết quả cụ thể, không chỉ nói tested."
        }
      ],
      "checks": [
        {
          "question": "What has Bao already checked?",
          "model": "Bao has checked the count fix."
        },
        {
          "question": "What is conditional?",
          "model": "Showing the downloaded error file is conditional on its retest."
        },
        {
          "question": "What will be updated by four?",
          "model": "The demo notes will be updated by four."
        }
      ],
      "followups": [
        "Mai: Give the same 60-second kickoff update as in session 1, now with the latest evidence.",
        "An: Which two files do I need for the demo?",
        "Bao: What must the error download contain?",
        "Mai: What if the retest fails?",
        "Support: Can I promise the feature to customers tomorrow?",
        "Mai: Close with owners, checks and the next update time."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Thứ Năm 14:00: sample đã tới; count đã sửa; file lỗi đang chờ retest. Demo thứ Sáu 15:00. Chỉ giới thiệu luồng đã xác nhận; chưa có quyết định release.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "Let me confirm the next step for IMP-101. / I have updated the PR with a test for invalid rows. / Could you help me with a duplicate row in the sample?",
      "grammar": "Ôn: have updated cho việc đã cập nhật; is pending cho việc vẫn chờ. Không thêm chunk mới.",
      "artifact": "Viết recap họp 5 dòng: Ready / Pending evidence / Demo decision / Owners / Next update. So sánh bản nói 60 giây với buổi 1 nếu đã lưu; không tự tạo điểm cũ.",
      "quiz": [
        {
          "question": "The retest has not happened. How should the demo note read?",
          "options": [
            "Error download is pending retest; update by 16:00.",
            "All parts are fully verified.",
            "The customer release is approved."
          ],
          "answer": 0,
          "explanation": "Giữ trạng thái pending tới khi có bằng chứng."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon."
          ],
          "answer": 1,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "planning-delegation",
      "title": "08 · Planning: ước lượng & phân chia việc",
      "stage": 2,
      "mission": "Chia ticket thành đầu ra rõ ràng, nhận việc phù hợp và chốt dependency. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Sau demo, nhóm lên kế hoạch pilot. IMP-201 API: Linh; IMP-202 UI: An; IMP-203 test: Bao. Cần API contract trước khi tích hợp. Bạn chỉ có 2 ngày rảnh vì còn trực hỗ trợ.",
      "input": "Mai: Can we finish the pilot work this week? Let's split this into three tasks: the API, the screen, and the test cases.\nLinh: I can own the API task. My estimate is two working days, assuming the contract does not change. I also have support duty on Wednesday.\nAn: The screen depends on the API contract. Could you send the field names first so I can use sample data?\nLinh: Yes. I can post the contract today and ask you to review it tomorrow morning.\nBao: I will prepare the test cases while you build the API.\nMai: Do we have enough time for integration and fixes?\nLinh: Can we agree on a check-in on Thursday morning? Two days is my build estimate, not the whole release schedule. We need to review the remaining work after integration.",
      "chunks": [
        {
          "id": "work-c31",
          "text": "Let's split this into …",
          "meaning": "Hãy chia việc này thành…",
          "use": "Chia việc lớn thành các phần có thể giao",
          "pattern": "Let's split this into + noun phrase",
          "simple": "Let's split this into two parts.",
          "example": "Let's split this into API, screen and test tasks."
        },
        {
          "id": "work-c32",
          "text": "I can own …",
          "meaning": "Tôi có thể chịu trách nhiệm…",
          "use": "Nhận trách nhiệm đầu ra của một ticket",
          "pattern": "I can own + noun phrase",
          "simple": "I can own this task.",
          "example": "I can own the API task for the pilot."
        },
        {
          "id": "work-c33",
          "text": "My estimate is …, assuming …",
          "meaning": "Tôi ước lượng… với giả định…",
          "use": "Ước lượng kèm giả định để tránh hứa quá mức",
          "pattern": "My estimate is + duration, assuming + clause",
          "simple": "My estimate is one day, assuming the file is ready.",
          "example": "My estimate is two working days, assuming the contract stays the same."
        },
        {
          "id": "work-c34",
          "text": "This depends on …",
          "meaning": "Việc này phụ thuộc vào…",
          "use": "Nêu việc cần có trước khi tiếp tục",
          "pattern": "This depends on + noun/V-ing",
          "simple": "This depends on access.",
          "example": "This depends on agreeing on the API contract."
        },
        {
          "id": "work-c35",
          "text": "Can we agree on …?",
          "meaning": "Chúng ta thống nhất… được không?",
          "use": "Chốt lịch hoặc điều kiện cả nhóm đồng ý",
          "pattern": "Can we agree on + noun/V-ing?",
          "simple": "Can we agree on a time?",
          "example": "Can we agree on a check-in on Thursday morning?"
        }
      ],
      "terms": [
        {
          "term": "estimate",
          "meaning": "ước lượng",
          "usage": "The build estimate is two days.",
          "pitfall": "Không tự biến estimate thành ngày release chắc chắn."
        },
        {
          "term": "capacity",
          "meaning": "khả năng nhận việc trong kỳ",
          "usage": "My capacity is two working days.",
          "pitfall": "Nêu thời gian thực có, gồm việc hỗ trợ."
        },
        {
          "term": "dependency",
          "meaning": "việc phụ thuộc",
          "usage": "The API contract is a dependency.",
          "pitfall": "Nêu người và đầu ra, không chỉ tên nhóm."
        },
        {
          "term": "check-in",
          "meaning": "lần kiểm tra tiến độ ngắn",
          "usage": "We have a check-in on Thursday.",
          "pitfall": "Không cần là một cuộc họp dài."
        },
        {
          "term": "integration",
          "meaning": "tích hợp",
          "usage": "Leave time for integration and fixes.",
          "pitfall": "Ước lượng code riêng chưa gồm mọi công việc."
        }
      ],
      "checks": [
        {
          "question": "What assumption supports the estimate?",
          "model": "The API contract does not change."
        },
        {
          "question": "How can An start early?",
          "model": "An can use sample data after receiving the field names."
        },
        {
          "question": "Why is two days not the release schedule?",
          "model": "It is only the build estimate; integration and fixes still need time."
        }
      ],
      "followups": [
        "Mai: Break the pilot into three tasks with one owner each.",
        "An: What can you send before the API is complete?",
        "Mai: Can you take another two-day task this week?",
        "Bao: What assumptions should I record with your estimate?",
        "Mai: Why is your estimate not a release promise?",
        "An: Confirm the handoff and next check-in."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Sau demo, nhóm lên kế hoạch pilot. IMP-201 API: Linh; IMP-202 UI: An; IMP-203 test: Bao. Cần API contract trước khi tích hợp. Bạn chỉ có 2 ngày rảnh vì còn trực hỗ trợ.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "Let's split this into API, screen and test tasks. / I can own the API task for the pilot. / My estimate is two working days, assuming the contract stays the same.",
      "grammar": "assuming + mệnh đề để nêu điều kiện của ước lượng, không phải sự thật chắc chắn.",
      "artifact": "Viết bảng bằng văn bản: Ticket | Owner | Output | Dependency | Check-in. Thêm estimate 2 ngày và giả định; không điền ngày release chưa chốt.",
      "quiz": [
        {
          "question": "You have two days of capacity and a two-day task. What do you say to extra work?",
          "options": [
            "I will hide the support duty from the plan.",
            "We need to change the priority or assign another owner.",
            "I can definitely finish everything at the same time."
          ],
          "answer": 1,
          "explanation": "Báo capacity thật và yêu cầu quyết định thứ tự ưu tiên."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket."
          ],
          "answer": 2,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "status-report",
      "title": "09 · Báo cáo tiến độ: đúng trạng thái & rủi ro",
      "stage": 2,
      "mission": "Báo cáo cho PM bằng đầu ra, bằng chứng, rủi ro và yêu cầu quyết định. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Thứ Năm 11:00, IMP-201 API đã trên staging, IMP-202 UI xong, IMP-203 còn 2/8 test chưa chạy vì tài khoản pilot chưa được cấp. Cập nhật tiếp 16:00.",
      "input": "Mai: I need a short pilot update for the stakeholder meeting. Are we ready?\nLinh: So far, we have completed the API and screen on staging. Six of eight test cases have passed. The remaining work is two access-related cases and the final review of the results.\nMai: What is stopping those tests?\nLinh: We are waiting for the pilot accounts. The main risk is a delay to the pilot if access arrives too late for QA to finish.\nBao: I can run the last cases today if the accounts are ready by two.\nLinh: We need a decision on who will follow up with the access team. Could you own that request, Mai?\nMai: Yes. I will ask them now.\nLinh: I will send the next update by four, including the test results or the revised plan. We should not report the pilot as ready yet.",
      "chunks": [
        {
          "id": "work-c36",
          "text": "So far, we have completed …",
          "meaning": "Đến giờ đã hoàn thành…",
          "use": "Báo phần hoàn thành có bằng chứng",
          "pattern": "So far, we have completed + noun",
          "simple": "So far, we have completed two checks.",
          "example": "So far, we have completed the API and screen on staging."
        },
        {
          "id": "work-c37",
          "text": "The remaining work is …",
          "meaning": "Phần việc còn lại là…",
          "use": "Nêu rõ các bước vẫn cần làm",
          "pattern": "The remaining work is + noun phrase",
          "simple": "The remaining work is the review.",
          "example": "The remaining work is two access-related tests and the final review."
        },
        {
          "id": "work-c38",
          "text": "The main risk is …",
          "meaning": "Rủi ro chính là…",
          "use": "Nêu điều có thể ảnh hưởng mục tiêu",
          "pattern": "The main risk is + noun phrase",
          "simple": "The main risk is a delay.",
          "example": "The main risk is a delay to the pilot if access arrives late."
        },
        {
          "id": "work-c39",
          "text": "We need a decision on …",
          "meaning": "Chúng tôi cần quyết định về…",
          "use": "Đề nghị người có thẩm quyền chốt việc",
          "pattern": "We need a decision on + noun/clause",
          "simple": "We need a decision on the owner.",
          "example": "We need a decision on who will follow up with the access team."
        },
        {
          "id": "work-c40",
          "text": "I will send the next update by …",
          "meaning": "Tôi sẽ cập nhật tiếp trước…",
          "use": "Hẹn hạn gửi thông tin tiếp theo",
          "pattern": "I will send the next update by + time",
          "simple": "I will send the next update by noon.",
          "example": "I will send the next update by four with the test status."
        }
      ],
      "terms": [
        {
          "term": "status report",
          "meaning": "báo cáo trạng thái",
          "usage": "Send a short status report.",
          "pitfall": "Không chỉ liệt kê đã bận làm gì."
        },
        {
          "term": "remaining work",
          "meaning": "việc còn lại",
          "usage": "List the remaining work.",
          "pitfall": "Nêu cả review và test, không chỉ code."
        },
        {
          "term": "risk",
          "meaning": "khả năng gây ảnh hưởng",
          "usage": "Late access is a risk to the pilot.",
          "pitfall": "Risk có thể xảy ra; issue là vấn đề đã xảy ra."
        },
        {
          "term": "pilot account",
          "meaning": "tài khoản dùng thử giới hạn",
          "usage": "QA needs the pilot accounts.",
          "pitfall": "Pilot khác mở cho mọi người dùng."
        },
        {
          "term": "stakeholder",
          "meaning": "người liên quan tới dự án",
          "usage": "The stakeholder needs a clear update.",
          "pitfall": "Không nhất thiết là manager của bạn."
        }
      ],
      "checks": [
        {
          "question": "How many cases have passed?",
          "model": "Six of eight cases have passed."
        },
        {
          "question": "What is blocking the other two?",
          "model": "The pilot accounts are not ready."
        },
        {
          "question": "What did Mai agree to own?",
          "model": "Mai will follow up with the access team."
        }
      ],
      "followups": [
        "Mai: Give me a 30-second factual status.",
        "Stakeholder: Can I announce that the pilot is ready?",
        "Bao: What changes if access arrives after two?",
        "Mai: What decision do you need from me?",
        "Stakeholder: Is “six of eight passed” the same as 75 percent of all project work?",
        "Mai: Finish with the next update time and what it will contain."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Thứ Năm 11:00, IMP-201 API đã trên staging, IMP-202 UI xong, IMP-203 còn 2/8 test chưa chạy vì tài khoản pilot chưa được cấp. Cập nhật tiếp 16:00.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "So far, we have completed the API and screen on staging. / The remaining work is two access-related tests and the final review. / The main risk is a delay to the pilot if access arrives late.",
      "grammar": "by + giờ là hạn chót: by four = trước hoặc lúc 16:00, khác at four = đúng lúc 16:00.",
      "artifact": "Viết status report 5 dòng: Done + evidence / Remaining / Risk + impact / Decision needed / Next update 16:00.",
      "quiz": [
        {
          "question": "How should the status be reported?",
          "options": [
            "The whole project is exactly 75 percent complete.",
            "All tests have passed because the code is finished.",
            "Six of eight tests passed; pilot readiness is still pending."
          ],
          "answer": 2,
          "explanation": "Tỉ lệ test không đại diện tỉ lệ hoàn thành toàn dự án."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed."
          ],
          "answer": 0,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "scope-negotiation",
      "title": "10 · Thay đổi yêu cầu: thương lượng deadline",
      "stage": 2,
      "mission": "Phản hồi yêu cầu mới bằng tác động và lựa chọn để PM quyết định. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Support muốn thêm phone vào import trước pilot. Hai ngày còn lại đã dành cho test và sửa lỗi. Chưa ước lượng validation số điện thoại. PM có quyền chọn đổi phạm vi hoặc dời pilot.",
      "input": "Support: Could we add phone numbers before the pilot? It looks like just one more column.\nLinh: If we add this, we will need new validation rules and test cases. I do not have an estimate for that work yet.\nMai: Can we keep the same pilot date?\nLinh: To keep the current date, we need to keep the agreed scope. The two remaining days are for testing and fixes, not unused capacity.\nSupport: We need phone numbers eventually.\nLinh: Could we move this to the next version? Another option is to delay the pilot after we estimate the change.\nMai: Let's keep names and emails for the pilot. Please create a separate ticket for phone numbers and review it with support tomorrow.\nLinh: Just to confirm, we are keeping the pilot scope unchanged. I will record your decision and the new ticket link in the meeting notes.",
      "chunks": [
        {
          "id": "work-c41",
          "text": "If we add this, we will need …",
          "meaning": "Nếu thêm việc này, sẽ cần…",
          "use": "Giải thích công việc phát sinh từ yêu cầu mới",
          "pattern": "If we add this, we will need + noun",
          "simple": "If we add this, we will need more time.",
          "example": "If we add this, we will need phone validation and new tests."
        },
        {
          "id": "work-c42",
          "text": "To keep the current date, …",
          "meaning": "Để giữ ngày hiện tại…",
          "use": "Nêu điều kiện cần để giữ thời hạn",
          "pattern": "To keep the current date, + clause",
          "simple": "To keep the current date, we need help.",
          "example": "To keep the current date, we need to keep the agreed scope."
        },
        {
          "id": "work-c43",
          "text": "Could we move this to …?",
          "meaning": "Có thể chuyển việc này sang…?",
          "use": "Đề nghị hoãn phạm vi mà vẫn theo dõi yêu cầu",
          "pattern": "Could we move this to + time/version?",
          "simple": "Could we move this to next week?",
          "example": "Could we move this to the next version?"
        },
        {
          "id": "work-c44",
          "text": "Another option is to …",
          "meaning": "Một lựa chọn khác là…",
          "use": "Đưa lựa chọn thay thế để người phụ trách cân nhắc",
          "pattern": "Another option is to + verb",
          "simple": "Another option is to wait.",
          "example": "Another option is to delay the pilot after estimating the change."
        },
        {
          "id": "work-c45",
          "text": "Just to confirm, we are …",
          "meaning": "Xin xác nhận lại, chúng ta đang…",
          "use": "Đọc lại quyết định sau thương lượng",
          "pattern": "Just to confirm, we are + V-ing/adjective",
          "simple": "Just to confirm, we are ready.",
          "example": "Just to confirm, we are keeping the pilot scope unchanged."
        }
      ],
      "terms": [
        {
          "term": "change request",
          "meaning": "yêu cầu thay đổi",
          "usage": "Record the change request in a ticket.",
          "pitfall": "Yêu cầu mới cần đánh giá tác động, không tự động được nhận."
        },
        {
          "term": "impact",
          "meaning": "ảnh hưởng",
          "usage": "Explain the impact on testing.",
          "pitfall": "Nêu ảnh hưởng cụ thể tới thời gian/phạm vi."
        },
        {
          "term": "deadline",
          "meaning": "hạn chót",
          "usage": "We need to discuss the deadline.",
          "pitfall": "Không chỉ nói deadline khó mà thiếu lựa chọn."
        },
        {
          "term": "validation rule",
          "meaning": "quy tắc kiểm tra dữ liệu",
          "usage": "We need phone validation rules.",
          "pitfall": "Thêm field chưa chắc chỉ thêm một cột."
        },
        {
          "term": "decision log",
          "meaning": "nơi ghi quyết định",
          "usage": "Add the scope decision to the decision log.",
          "pitfall": "Ghi ai quyết định và lý do, không chỉ kết quả."
        }
      ],
      "checks": [
        {
          "question": "Why is the new column extra work?",
          "model": "It needs validation rules and new tests."
        },
        {
          "question": "What are the two remaining days for?",
          "model": "They are for testing and fixes."
        },
        {
          "question": "What did Mai decide?",
          "model": "Keep names and emails for the pilot and create a separate phone-number ticket."
        }
      ],
      "followups": [
        "Support: It is only one column. Why can you not add it now?",
        "Mai: Can you promise the same date today?",
        "Support: What options do we have?",
        "Mai: Who should decide between scope and date?",
        "Support: What will happen to my request if we postpone it?",
        "Mai: Read back the decision, owner and next review."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Support muốn thêm phone vào import trước pilot. Hai ngày còn lại đã dành cho test và sửa lỗi. Chưa ước lượng validation số điện thoại. PM có quyền chọn đổi phạm vi hoặc dời pilot.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "If we add this, we will need phone validation and new tests. / To keep the current date, we need to keep the agreed scope. / Could we move this to the next version?",
      "grammar": "If + hiện tại, will + động từ: If we add this, we will need more tests.",
      "artifact": "Viết tin nhắn xác nhận change request: Request / Impact / Options / Decision by Mai / Follow-up ticket. Tránh hứa estimate chưa có.",
      "quiz": [
        {
          "question": "What was agreed?",
          "options": [
            "Phone numbers move to a separate ticket; the pilot scope stays unchanged.",
            "Phone import is included with no extra work.",
            "The developer alone cancelled the pilot."
          ],
          "answer": 0,
          "explanation": "Ghi đúng quyết định và người có quyền chốt."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon."
          ],
          "answer": 1,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "release-handoff",
      "title": "11 · Release: go/no-go & bàn giao vận hành",
      "stage": 3,
      "mission": "Chốt điều kiện pilot, người trực và hành động khi cần dừng. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Hai case access đã pass. Pilot 10 tài khoản support lúc 10:00 ngày mai, cần Mai duyệt. Bao lưu 8/8 test; Linh theo dõi 30 phút. Nếu lỗi ghi dữ liệu, tắt quyền import mới rồi điều tra các bản ghi đã tạo.",
      "input": "Mai: Are we ready to enable the pilot for ten support accounts tomorrow at ten?\nBao: All eight agreed test cases passed on the release build. I attached the results to the ticket.\nLinh: Before we go live, we need your approval and a named contact from support. The release is limited to ten accounts; it is not open to everyone.\nMai: I approve that scope. Who will watch the first imports?\nLinh: I will monitor the results for thirty minutes. If we see incorrect writes, we will disable new imports and check the records already created. Disabling the feature will not undo those records.\nBao: Who will confirm the first successful file?\nLinh: Please confirm that the support contact can upload the agreed sample. The handover includes the release ticket, known limits, and the contact list. I will post the pilot result at ten thirty.",
      "chunks": [
        {
          "id": "work-c46",
          "text": "Before we go live, …",
          "meaning": "Trước khi chạy thật…",
          "use": "Nêu điều kiện phải xong trước khi mở tính năng",
          "pattern": "Before we go live, + clause",
          "simple": "Before we go live, we need approval.",
          "example": "Before we go live, we need a named support contact."
        },
        {
          "id": "work-c47",
          "text": "The release is limited to …",
          "meaning": "Bản phát hành được giới hạn ở…",
          "use": "Chốt phạm vi tài khoản hoặc nhóm người dùng",
          "pattern": "The release is limited to + noun",
          "simple": "The release is limited to our team.",
          "example": "The release is limited to ten support accounts."
        },
        {
          "id": "work-c48",
          "text": "I will monitor …",
          "meaning": "Tôi sẽ theo dõi…",
          "use": "Nhận trách nhiệm theo dõi sau phát hành",
          "pattern": "I will monitor + noun + duration",
          "simple": "I will monitor the results.",
          "example": "I will monitor the first imports for thirty minutes."
        },
        {
          "id": "work-c49",
          "text": "If we see …, we will …",
          "meaning": "Nếu thấy…, chúng ta sẽ…",
          "use": "Thống nhất điều kiện dừng và hành động tiếp theo",
          "pattern": "If we see + noun, we will + verb",
          "simple": "If we see errors, we will pause.",
          "example": "If we see incorrect writes, we will disable new imports."
        },
        {
          "id": "work-c50",
          "text": "The handover includes …",
          "meaning": "Nội dung bàn giao gồm…",
          "use": "Liệt kê tài liệu và thông tin bàn giao",
          "pattern": "The handover includes + list",
          "simple": "The handover includes the notes.",
          "example": "The handover includes the ticket, known limits and contact list."
        }
      ],
      "terms": [
        {
          "term": "go/no-go",
          "meaning": "quyết định chạy hay hoãn",
          "usage": "We need a go/no-go decision.",
          "pitfall": "Không mặc định go vì đến giờ dự kiến."
        },
        {
          "term": "approval",
          "meaning": "sự phê duyệt",
          "usage": "Mai gave approval for ten accounts.",
          "pitfall": "Approval áp dụng đúng phạm vi được duyệt."
        },
        {
          "term": "monitor",
          "meaning": "theo dõi",
          "usage": "Monitor the first imports.",
          "pitfall": "Nêu ai theo dõi, theo dõi gì và bao lâu."
        },
        {
          "term": "disable",
          "meaning": "vô hiệu hóa",
          "usage": "Disable new imports if writes are wrong.",
          "pitfall": "Tắt tính năng không tự hoàn tác dữ liệu đã ghi."
        },
        {
          "term": "handover",
          "meaning": "bàn giao",
          "usage": "The handover includes known limits.",
          "pitfall": "Không chỉ gửi link code rồi xem là xong."
        }
      ],
      "checks": [
        {
          "question": "What evidence did Bao attach?",
          "model": "Results showing all eight agreed tests passed on the release build."
        },
        {
          "question": "What does disabling new imports not do?",
          "model": "It does not undo records already created."
        },
        {
          "question": "When will Linh post the result?",
          "model": "At ten thirty, after thirty minutes of monitoring."
        }
      ],
      "followups": [
        "Mai: State the exact scope you need approved.",
        "Support: Can all accounts use this tomorrow?",
        "Bao: What evidence supports the go decision?",
        "Mai: What will you do if the import writes incorrect records?",
        "Support: Does disabling import remove the records already created?",
        "Mai: Close with the contact, monitoring owner and next update."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Hai case access đã pass. Pilot 10 tài khoản support lúc 10:00 ngày mai, cần Mai duyệt. Bao lưu 8/8 test; Linh theo dõi 30 phút. Nếu lỗi ghi dữ liệu, tắt quyền import mới rồi điều tra các bản ghi đã tạo.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "Before we go live, we need a named support contact. / The release is limited to ten support accounts. / I will monitor the first imports for thirty minutes.",
      "grammar": "Before + hiện tại; If + hiện tại, will + động từ. Nêu điều kiện dừng cụ thể.",
      "artifact": "Viết handover 6 dòng: Approved scope / Build + test evidence / Contact / Monitor / Stop condition + data check / Update 10:30.",
      "quiz": [
        {
          "question": "The feature is disabled after incorrect writes. What is still needed?",
          "options": [
            "Re-enable immediately without investigation.",
            "Check the records already created and agree on data recovery.",
            "Assume all written records disappeared automatically."
          ],
          "answer": 1,
          "explanation": "Dừng luồng mới và xử lý dữ liệu cũ là hai việc khác nhau."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket."
          ],
          "answer": 2,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "incident-update",
      "title": "12 · Sự cố production: phối hợp & cập nhật",
      "stage": 3,
      "mission": "Báo cáo ảnh hưởng đã xác nhận, phân công điều tra và hẹn cập nhật. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Pilot 10:12: 2/10 tài khoản báo import bị treo; chưa biết có ghi trùng hay không. Mai điều phối, Linh điều tra, Bao kiểm tra dữ liệu, An hỗ trợ thông báo. Tạm tắt import mới lúc 10:15.",
      "input": "Mai: Two pilot users say their import is stuck. What do we know so far?\nLinh: The impact is that those two users cannot finish their uploads. We do not yet know whether other accounts are affected or whether any records were written twice.\nBao: I will compare the request IDs with the saved records. Please ask the users not to retry while I check.\nLinh: As a temporary measure, we have disabled new imports at ten fifteen. That stops new requests, but it does not explain the cause.\nMai: I will coordinate updates. Linh, check the request logs. An, tell support that we are investigating.\nLinh: Our next step is to compare the failed requests with a successful one. The next update will be at ten thirty, even if we have not found the cause. We will separate confirmed facts from our current guesses.",
      "chunks": [
        {
          "id": "work-c51",
          "text": "The impact is that …",
          "meaning": "Ảnh hưởng là…",
          "use": "Báo ảnh hưởng đã xác nhận của sự cố",
          "pattern": "The impact is that + clause",
          "simple": "The impact is that users must wait.",
          "example": "The impact is that two users cannot finish their uploads."
        },
        {
          "id": "work-c52",
          "text": "We do not yet know whether …",
          "meaning": "Chúng tôi chưa biết liệu…",
          "use": "Nói rõ điều chưa biết để tránh suy đoán",
          "pattern": "We do not yet know whether + clause",
          "simple": "We do not yet know whether it worked.",
          "example": "We do not yet know whether any records were written twice."
        },
        {
          "id": "work-c53",
          "text": "As a temporary measure, …",
          "meaning": "Như biện pháp tạm thời…",
          "use": "Phân biệt giảm ảnh hưởng tạm thời với sửa nguyên nhân",
          "pattern": "As a temporary measure, + clause",
          "simple": "As a temporary measure, we paused the task.",
          "example": "As a temporary measure, we have disabled new imports."
        },
        {
          "id": "work-c54",
          "text": "Our next step is to …",
          "meaning": "Bước tiếp theo là…",
          "use": "Nêu bước điều tra tiếp theo",
          "pattern": "Our next step is to + verb",
          "simple": "Our next step is to check the logs.",
          "example": "Our next step is to compare failed and successful requests."
        },
        {
          "id": "work-c55",
          "text": "The next update will be at …",
          "meaning": "Lần cập nhật tiếp theo lúc…",
          "use": "Giữ nhịp cập nhật kể cả chưa có nguyên nhân",
          "pattern": "The next update will be at + time",
          "simple": "The next update will be at noon.",
          "example": "The next update will be at ten thirty, even without a confirmed cause."
        }
      ],
      "terms": [
        {
          "term": "incident",
          "meaning": "sự cố đang ảnh hưởng dịch vụ",
          "usage": "We are investigating the incident.",
          "pitfall": "Không đợi biết nguyên nhân mới báo ảnh hưởng."
        },
        {
          "term": "impact",
          "meaning": "ảnh hưởng",
          "usage": "Confirm the user impact.",
          "pitfall": "Không suy rộng 2 người báo lỗi thành toàn bộ hệ thống."
        },
        {
          "term": "temporary measure",
          "meaning": "biện pháp tạm thời",
          "usage": "Disabling import is a temporary measure.",
          "pitfall": "Giảm ảnh hưởng chưa phải sửa nguyên nhân."
        },
        {
          "term": "request ID",
          "meaning": "mã yêu cầu",
          "usage": "Compare the request IDs.",
          "pitfall": "Dùng mã để đối chiếu; không cần đưa dữ liệu khách hàng vào chat."
        },
        {
          "term": "confirmed fact",
          "meaning": "sự thật đã xác nhận",
          "usage": "Separate confirmed facts from guesses.",
          "pitfall": "Không gọi giả thuyết là root cause đã biết."
        }
      ],
      "checks": [
        {
          "question": "What is the confirmed user impact?",
          "model": "Two pilot users cannot finish their uploads."
        },
        {
          "question": "What is Bao checking?",
          "model": "Bao is comparing request IDs with saved records, including possible duplicates."
        },
        {
          "question": "Will the update wait for the root cause?",
          "model": "No. The next update is at ten thirty even if the cause is unknown."
        }
      ],
      "followups": [
        "Mai: Give me confirmed facts only.",
        "Support: Should the two users keep retrying?",
        "Bao: Who will compare request IDs and stored records?",
        "Stakeholder: Is the database definitely the root cause?",
        "Mai: What did disabling new imports achieve, and what remains unknown?",
        "Support: When will we hear from you again if there is no fix yet?"
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Pilot 10:12: 2/10 tài khoản báo import bị treo; chưa biết có ghi trùng hay không. Mai điều phối, Linh điều tra, Bao kiểm tra dữ liệu, An hỗ trợ thông báo. Tạm tắt import mới lúc 10:15.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "The impact is that two users cannot finish their uploads. / We do not yet know whether any records were written twice. / As a temporary measure, we have disabled new imports.",
      "grammar": "whether + mệnh đề để nêu điều chưa biết: We do not yet know whether records were duplicated.",
      "artifact": "Viết incident update lúc 10:15: Impact / Unknowns / Temporary action / Investigation owners / Next update 10:30. Không bịa nguyên nhân hoặc ETA sửa xong.",
      "quiz": [
        {
          "question": "The cause is unknown at 10:30. What should you do?",
          "options": [
            "Stay silent until the cause is known.",
            "Claim the database is the cause without evidence.",
            "Send the promised update with current facts and next steps."
          ],
          "answer": 2,
          "explanation": "Giữ nhịp cập nhật, phân biệt điều biết và chưa biết."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed."
          ],
          "answer": 0,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "management-feedback",
      "title": "13 · Quản lý: 1:1, quá tải & cải tiến sau sự cố",
      "stage": 3,
      "mission": "Trao đổi riêng về quá tải bằng quan sát, tác động và kế hoạch hỗ trợ. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Buổi 1:1 sau pilot. Linh bị ngắt quãng bởi hỗ trợ và bỏ lỡ 2 mốc cập nhật đã hẹn. Mai không quy kết thái độ; cần thống nhất đầu mối support và kiểm tra lại thứ Sáu.",
      "input": "Mai: In the last two updates, the notes arrived after the agreed time. That made it harder for support to answer users. Can you walk me through what happened?\nLinh: I was switching between the fix and direct messages from support. I should have asked for help earlier. I did not have a clear backup for communication.\nMai: What support do you need to keep the next update on time?\nLinh: Could An collect the support questions while I investigate? I can also post a short update even when the technical result is unchanged.\nMai: Let's agree on one action for this week. I will ask An to be the support contact during your investigation window. You will keep the scheduled updates.\nLinh: That sounds workable.\nMai: We will review this on Friday using the update timestamps and your workload notes. This is about making the process manageable, not blaming one person.",
      "chunks": [
        {
          "id": "work-c56",
          "text": "In the last …, …",
          "meaning": "Trong… vừa qua…",
          "use": "Mở feedback bằng quan sát cụ thể có thời điểm",
          "pattern": "In the last + period/events, + observation",
          "simple": "In the last meeting, we ran out of time.",
          "example": "In the last two updates, the notes arrived after the agreed time."
        },
        {
          "id": "work-c57",
          "text": "Can you walk me through …?",
          "meaning": "Bạn mô tả từng bước… được không?",
          "use": "Mời người nhận kể lại bối cảnh trước khi kết luận",
          "pattern": "Can you walk me through + noun/clause?",
          "simple": "Can you walk me through the task?",
          "example": "Can you walk me through what happened during the incident?"
        },
        {
          "id": "work-c58",
          "text": "What support do you need …?",
          "meaning": "Bạn cần hỗ trợ gì…?",
          "use": "Hỏi hỗ trợ cần thiết để kế hoạch khả thi",
          "pattern": "What support do you need + to verb?",
          "simple": "What support do you need to finish?",
          "example": "What support do you need to keep the next update on time?"
        },
        {
          "id": "work-c59",
          "text": "Let's agree on one action …",
          "meaning": "Hãy thống nhất một hành động…",
          "use": "Chốt một cải tiến có thể thực hiện",
          "pattern": "Let's agree on one action + time",
          "simple": "Let's agree on one action today.",
          "example": "Let's agree on one action for the next investigation window."
        },
        {
          "id": "work-c60",
          "text": "We will review this on …",
          "meaning": "Chúng ta sẽ xem lại vào…",
          "use": "Hẹn xem lại với bằng chứng quan sát được",
          "pattern": "We will review this on + day",
          "simple": "We will review this on Monday.",
          "example": "We will review this on Friday using update timestamps."
        }
      ],
      "terms": [
        {
          "term": "one-on-one",
          "meaning": "buổi trao đổi riêng hai người",
          "usage": "We have a one-on-one on Friday.",
          "pitfall": "Không biến trao đổi riêng thành phê bình công khai."
        },
        {
          "term": "workload",
          "meaning": "khối lượng công việc",
          "usage": "Discuss the workload honestly.",
          "pitfall": "Không đánh đồng quá tải với thiếu cố gắng."
        },
        {
          "term": "backup",
          "meaning": "người/phương án thay thế",
          "usage": "We need a communication backup.",
          "pitfall": "Trong bài này không phải bản sao dữ liệu."
        },
        {
          "term": "feedback",
          "meaning": "phản hồi",
          "usage": "Give feedback on a specific behavior.",
          "pitfall": "Feedback thường không đếm được; dùng some feedback."
        },
        {
          "term": "action item",
          "meaning": "việc cụ thể sau trao đổi",
          "usage": "Record one action item with an owner.",
          "pitfall": "Improve communication quá chung chung nếu không có hành động."
        }
      ],
      "checks": [
        {
          "question": "What observation starts the conversation?",
          "model": "The last two updates arrived after the agreed time."
        },
        {
          "question": "What made the work difficult for Linh?",
          "model": "Switching between the fix and direct support messages without a communication backup."
        },
        {
          "question": "What evidence will they use on Friday?",
          "model": "Update timestamps and workload notes."
        }
      ],
      "followups": [
        "Mai: Describe the missed updates without calling someone careless.",
        "Linh: Explain the competing work and one thing you could do differently.",
        "Mai: What support would make the plan realistic?",
        "An: What questions should I collect, and during which window?",
        "Mai: What will count as evidence of improvement?",
        "Linh: Confirm the action owners and review date."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Buổi 1:1 sau pilot. Linh bị ngắt quãng bởi hỗ trợ và bỏ lỡ 2 mốc cập nhật đã hẹn. Mai không quy kết thái độ; cần thống nhất đầu mối support và kiểm tra lại thứ Sáu.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "In the last two updates, the notes arrived after the agreed time. / Can you walk me through what happened during the incident? / What support do you need to keep the next update on time?",
      "grammar": "Câu hỏi mở What support… / Can you walk me through… để tìm hiểu trước khi đưa giải pháp.",
      "artifact": "Viết recap 1:1: Observation / Impact / Employee context / Support action + owner / Friday evidence. Chỉ ghi điều quan sát được.",
      "quiz": [
        {
          "question": "Which feedback is actionable?",
          "options": [
            "The last two updates were late; let us agree on coverage and review timestamps Friday.",
            "You never care about the team.",
            "Be better at everything immediately."
          ],
          "answer": 0,
          "explanation": "Dùng hành vi quan sát được và hành động có người phụ trách, tránh quy chụp."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket.",
            "Someone will handle it soon."
          ],
          "answer": 1,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    },
    {
      "id": "workday-simulation",
      "title": "14 · Mô phỏng ngày làm việc: từ daily đến bàn giao",
      "stage": 3,
      "mission": "Tổng hợp báo cáo, phân công, thương lượng và chốt việc bằng 5 chunk cũ. Nói 60–90 giây, dùng ít nhất 3/5 chunk rồi xử lý 6 lượt trao đổi.",
      "context": "Kịch bản ôn: thứ Năm tuần kế tiếp, pilot đã mở lại theo quyết định giả định của PM sau kiểm chứng. Bạn chuẩn bị mở rộng từ 10 lên 20 tài khoản, nhưng QA thiếu 1 case quyền truy cập. PM chưa duyệt mở rộng; Support lại hỏi phone import.",
      "input": "Mai: Give us the morning update before we discuss the next pilot group.\nLinh: So far, we have completed the checks for the original ten accounts. The remaining work is one access test for the next group. I can own the test setup, and Bao can run the case after lunch.\nSupport: Could we add phone numbers when the next group starts?\nLinh: Could we move this to the next version? The phone rules still need a separate review. Today's decision is whether to expand from ten accounts to twenty.\nMai: Good distinction. Do not expand until Bao posts the result and I approve the change.\nBao: I will attach the result by three, or report the blocker at that time.\nLinh: Just to confirm, we are keeping the current ten-account limit until approval. I will update the decision note and send a short handover before four.",
      "chunks": [
        {
          "id": "work-c36",
          "text": "So far, we have completed …",
          "meaning": "Đến giờ đã hoàn thành…",
          "use": "Báo phần hoàn thành có bằng chứng",
          "pattern": "So far, we have completed + noun",
          "simple": "So far, we have completed two checks.",
          "example": "So far, we have completed the API and screen on staging."
        },
        {
          "id": "work-c37",
          "text": "The remaining work is …",
          "meaning": "Phần việc còn lại là…",
          "use": "Nêu rõ các bước vẫn cần làm",
          "pattern": "The remaining work is + noun phrase",
          "simple": "The remaining work is the review.",
          "example": "The remaining work is two access-related tests and the final review."
        },
        {
          "id": "work-c32",
          "text": "I can own …",
          "meaning": "Tôi có thể chịu trách nhiệm…",
          "use": "Nhận trách nhiệm đầu ra của một ticket",
          "pattern": "I can own + noun phrase",
          "simple": "I can own this task.",
          "example": "I can own the API task for the pilot."
        },
        {
          "id": "work-c43",
          "text": "Could we move this to …?",
          "meaning": "Có thể chuyển việc này sang…?",
          "use": "Đề nghị hoãn phạm vi mà vẫn theo dõi yêu cầu",
          "pattern": "Could we move this to + time/version?",
          "simple": "Could we move this to next week?",
          "example": "Could we move this to the next version?"
        },
        {
          "id": "work-c45",
          "text": "Just to confirm, we are …",
          "meaning": "Xin xác nhận lại, chúng ta đang…",
          "use": "Đọc lại quyết định sau thương lượng",
          "pattern": "Just to confirm, we are + V-ing/adjective",
          "simple": "Just to confirm, we are ready.",
          "example": "Just to confirm, we are keeping the pilot scope unchanged."
        }
      ],
      "terms": [
        {
          "term": "expansion",
          "meaning": "mở rộng",
          "usage": "Expansion needs approval.",
          "pitfall": "Pilot cũ được duyệt không tự duyệt phạm vi mới."
        },
        {
          "term": "access test",
          "meaning": "kiểm thử quyền truy cập",
          "usage": "One access test is still pending.",
          "pitfall": "Thiếu một case vẫn phải nêu rõ trước quyết định."
        },
        {
          "term": "handover",
          "meaning": "bàn giao",
          "usage": "Send the handover before four.",
          "pitfall": "Ôn từ buổi release; gồm trạng thái và việc còn chờ."
        },
        {
          "term": "decision note",
          "meaning": "ghi chú quyết định",
          "usage": "Update the decision note after approval.",
          "pitfall": "Phân biệt đề xuất và quyết định đã duyệt."
        },
        {
          "term": "follow-up",
          "meaning": "việc trao đổi tiếp",
          "usage": "Schedule a follow-up for phone rules.",
          "pitfall": "Nêu rõ ai theo dõi và khi nào."
        }
      ],
      "checks": [
        {
          "question": "What is still pending before expansion?",
          "model": "One access test and Mai's approval are still pending."
        },
        {
          "question": "Is phone import part of today's decision?",
          "model": "No. Phone rules need a separate review."
        },
        {
          "question": "What happens if Bao is blocked at three?",
          "model": "Bao will report the blocker at three instead of claiming the test passed."
        }
      ],
      "followups": [
        "Mai: Give a 60-second status report using the same structure as session 8: tasks, owners, dependencies and check-in. Compare only with a recording you actually made.",
        "Bao: Delegate the test setup and execution with a clear handoff.",
        "Support: Push back politely on adding phone numbers today.",
        "Mai: Decide whether you can expand before the test result and approval.",
        "Bao: At 15:00 the test is blocked. Give an honest stakeholder update.",
        "Mai: End with a handover message: scope, pending decision, owners and next update."
      ],
      "sources": [],
      "preparation": [
        "Bạn đóng vai người phụ trách ticket; người cùng luyện đóng vai đồng nghiệp ghi trong từng câu hỏi. Chưa có dự án thật thì dùng dữ kiện giả định bên dưới.",
        "Kịch bản ôn: thứ Năm tuần kế tiếp, pilot đã mở lại theo quyết định giả định của PM sau kiểm chứng. Bạn chuẩn bị mở rộng từ 10 lên 20 tài khoản, nhưng QA thiếu 1 case quyền truy cập. PM chưa duyệt mở rộng; Support lại hỏi phone import.",
        "Ghi 3 điều: đã xác nhận, chưa biết, cần ai quyết định. Với dữ liệu dự án thật, dùng tên và số liệu đã ẩn thông tin nhạy cảm."
      ],
      "speakingGuide": [
        "0–15 giây: nêu mục tiêu và tình trạng hiện tại.",
        "15–40 giây: đưa chi tiết từ ticket, bằng chứng hoặc ví dụ.",
        "40–65 giây: nêu rủi ro, điều chưa biết và đề nghị cụ thể.",
        "65–90 giây: chốt người làm, hạn và cách xác nhận. Sau đó trao đổi 6 lượt; đọc câu hỏi của đối tác, trả lời thành tiếng rồi mới sang câu tiếp."
      ],
      "pitfalls": [
        "Không nói “done” nếu mới viết xong code: nêu rõ đã review, đã test hay đã đưa lên môi trường nào.",
        "Không hứa thời hạn chắc chắn khi còn phụ thuộc: nêu điều kiện và thời điểm cập nhật lại.",
        "Không dùng “we” cho mọi việc: nói rõ người thực hiện, người duyệt và ai cần được thông báo."
      ],
      "rubric": [
        "Rõ việc: trích một câu bạn đã nói có ticket hoặc đầu ra cụ thể.",
        "Rõ giới hạn: trích câu phân biệt sự thật với dự đoán.",
        "Rõ hành động: trích câu có người phụ trách, thời hạn và bước kiểm chứng."
      ],
      "shadowing": "So far, we have completed the API and screen on staging. / The remaining work is two access-related tests and the final review. / I can own the API task for the pilot.",
      "grammar": "Ôn các mẫu đã học; không thêm chunk mới. Dùng đúng thời: đã làm, đang chờ, sẽ làm.",
      "artifact": "Viết 3 đầu ra: daily 4 dòng; tin nhắn thương lượng phone request; handover 5 dòng. Dùng 5 chunk cũ. Tự ghi chunk nhớ không nhìn, số giây và tối đa 3 lỗi cần sửa; ôn lại bài tương ứng khi bí.",
      "quiz": [
        {
          "question": "What is allowed before the new test and approval?",
          "options": [
            "Announce phone import without a review.",
            "Keep the current ten-account limit and report the pending work.",
            "Expand to twenty because ten accounts were approved earlier."
          ],
          "answer": 1,
          "explanation": "Quyền duyệt có phạm vi; không suy từ phạm vi cũ sang phạm vi mới."
        },
        {
          "question": "Which closing message makes the next step clear?",
          "options": [
            "Someone will handle it soon.",
            "Everything should be fine; no update is needed.",
            "I will post the agreed action, owner and next update time in the ticket."
          ],
          "answer": 2,
          "explanation": "Chốt đầu việc, người phụ trách và mốc cập nhật để người khác có thể tiếp tục làm việc."
        }
      ]
    }
  ]
};
