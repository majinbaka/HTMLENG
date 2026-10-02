// Original interview practice. Technical references reviewed 2026-10-02.
// Experience scenarios are fictional teaching material, not learner history.
window.SpeakSprintTopicsData = {
  "id": "node-ai-interview",
  "category": "Chủ đề chuyên sâu",
  "title": "Senior Backend Interview · Technical & Real Experience",
  "description": "Luyện phỏng vấn kỹ thuật và kể kinh nghiệm thật: giới thiệu bản thân, dự án, xử lý issue, hỗ trợ member, proposal và demo với khách hàng.",
  "stages": [
    "01 · Node.js runtime",
    "02 · System design & data",
    "03 · AI application engineering",
    "04 · Production & mock interview",
    "05 · Giới thiệu, dự án & giải quyết vấn đề",
    "06 · Teamwork, presales & phỏng vấn thực tế"
  ],
  "sessions": [
    {
      "id": "event-loop",
      "title": "Event loop & latency",
      "stage": 0,
      "mission": "Giải thích API bị chậm dù đã dùng async/await; nói 60–90 giây với ít nhất 3 chunk.",
      "input": "Interviewer: Our Node.js API becomes slow when it builds large reports. Why?\nCandidate: In my experience, async functions can still do expensive JavaScript work. The main bottleneck is the report calculation on the main thread. Other requests wait while that calculation runs. I would start by measuring event loop delay and profiling the busy path. We could move CPU work to a worker pool, or run reports as background jobs. The trade-off is extra coordination and queue time. I would verify this by comparing tail latency under the same load. I would also check database time before blaming the runtime. These are proposed steps, not results I have already measured.",
      "chunks": [
        {
          "id": "c1",
          "text": "In my experience, …",
          "meaning": "Theo kinh nghiệm của tôi…",
          "use": "Mở câu với trải nghiệm đã có",
          "pattern": "In my experience, + clause",
          "simple": "In my experience, small changes are easier to review.",
          "example": "In my experience, async code can still block the main thread."
        },
        {
          "id": "c2",
          "text": "The main bottleneck is …",
          "meaning": "Điểm nghẽn chính là…",
          "use": "Chỉ ra chỗ giới hạn hiệu năng",
          "pattern": "The main bottleneck is + noun phrase",
          "simple": "The main bottleneck is the database.",
          "example": "The main bottleneck is report calculation."
        },
        {
          "id": "c3",
          "text": "I would start by …",
          "meaning": "Tôi sẽ bắt đầu bằng…",
          "use": "Mô tả bước điều tra đầu tiên",
          "pattern": "I would start by + V-ing",
          "simple": "I would start by checking the logs.",
          "example": "I would start by measuring event loop delay."
        },
        {
          "id": "c4",
          "text": "The trade-off is …",
          "meaning": "Điều phải đánh đổi là…",
          "use": "Nêu cái giá của một lựa chọn",
          "pattern": "The trade-off is + noun phrase",
          "simple": "The trade-off is higher memory use.",
          "example": "The trade-off is extra queue time."
        },
        {
          "id": "c5",
          "text": "I would verify this by …",
          "meaning": "Tôi sẽ kiểm chứng bằng…",
          "use": "Đưa bằng chứng thay vì khẳng định suông",
          "pattern": "I would verify this by + V-ing",
          "simple": "I would verify this by running a test.",
          "example": "I would verify this by comparing p95 latency."
        }
      ],
      "terms": [
        {
          "term": "event loop",
          "meaning": "Vòng lặp điều phối callback",
          "usage": "block the event loop",
          "pitfall": "Async không tự chuyển JavaScript nặng sang thread khác."
        },
        {
          "term": "latency",
          "meaning": "Thời gian chờ một thao tác",
          "usage": "reduce request latency",
          "pitfall": "Latency là thời gian; throughput là lượng việc mỗi đơn vị thời gian."
        },
        {
          "term": "CPU-bound",
          "meaning": "Bị giới hạn bởi tính toán CPU",
          "usage": "a CPU-bound task",
          "pitfall": "Không gọi mọi request chậm là CPU-bound khi chưa đo."
        },
        {
          "term": "I/O-bound",
          "meaning": "Bị giới hạn bởi thao tác vào/ra",
          "usage": "an I/O-bound workload",
          "pitfall": "Đọc từ mạng/đĩa khác với tính toán CPU."
        },
        {
          "term": "tail latency",
          "meaning": "Độ trễ ở phần đuôi phân phối",
          "usage": "measure p95 tail latency",
          "pitfall": "p95 là phân vị 95, không phải độ trễ trung bình."
        }
      ],
      "checks": [
        {
          "question": "Why can other requests wait?",
          "model": "The report calculation occupies the main JavaScript thread."
        },
        {
          "question": "Which two measurements would you collect first?",
          "model": "Event loop delay and a profile of the busy code path."
        },
        {
          "question": "Why check database time too?",
          "model": "The database could also cause the delay; the runtime is only a hypothesis."
        }
      ],
      "followups": [
        "Would adding async to a CPU-heavy function solve this?",
        "How would you separate database delay from event loop delay?",
        "When would you choose a background job over a worker?",
        "What would convince you that your change helped?"
      ],
      "quiz": [
        {
          "question": "A CPU-heavy loop is inside an async function. What happens?",
          "options": [
            "It automatically runs on another core.",
            "It can still block the main thread."
          ],
          "answer": 1,
          "explanation": "async changes the return/await behavior; it does not offload synchronous CPU work."
        },
        {
          "question": "Average latency is good but some users wait too long. What helps?",
          "options": [
            "Inspect p95/p99 and traces.",
            "Only report the mean."
          ],
          "answer": 0,
          "explanation": "Tail percentiles expose slow requests hidden by an average."
        }
      ],
      "sources": [
        [
          "Node.js · Don’t block the event loop",
          "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
        ]
      ]
    },
    {
      "id": "worker-pools",
      "title": "Workers, concurrency & bounded work",
      "stage": 0,
      "mission": "Phân biệt concurrency và parallelism; bảo vệ lựa chọn worker pool trong 90 giây.",
      "input": "Interviewer: Should we create a worker for every incoming request?\nCandidate: It depends on the workload. For network calls, built-in asynchronous I/O is usually enough. For heavy JavaScript calculations, workers can run work in parallel. We need to make sure that the number of active workers stays bounded. One failure mode is creating so many workers that memory and scheduling overhead grow. To reduce the risk, I would use a fixed pool and a limited queue. I would choose a rejection policy because an unlimited backlog can hide overload. I would measure queue wait, CPU use, and request time together. A fast calculation is not enough if the request waits too long before it starts.",
      "chunks": [
        {
          "id": "c6",
          "text": "It depends on …",
          "meaning": "Điều đó phụ thuộc vào…",
          "use": "Nêu điều kiện quyết định",
          "pattern": "It depends on + noun phrase",
          "simple": "It depends on the traffic pattern.",
          "example": "It depends on whether the work is CPU-bound."
        },
        {
          "id": "c7",
          "text": "We need to make sure that …",
          "meaning": "Ta cần bảo đảm rằng…",
          "use": "Nêu điều kiện phải giữ đúng",
          "pattern": "We need to make sure that + clause",
          "simple": "We need to make sure that users can retry safely.",
          "example": "We need to make sure that the queue stays bounded."
        },
        {
          "id": "c8",
          "text": "One failure mode is …",
          "meaning": "Một tình huống hệ thống lỗi là…",
          "use": "Dự đoán lỗi cụ thể",
          "pattern": "One failure mode is + noun phrase",
          "simple": "One failure mode is a duplicate payment.",
          "example": "One failure mode is worker exhaustion."
        },
        {
          "id": "c9",
          "text": "To reduce the risk, …",
          "meaning": "Để giảm rủi ro…",
          "use": "Đề xuất biện pháp giảm thiểu",
          "pattern": "To reduce the risk, + clause",
          "simple": "To reduce the risk, I would limit retries.",
          "example": "To reduce the risk, I would use a fixed pool."
        },
        {
          "id": "c10",
          "text": "I would choose … because …",
          "meaning": "Tôi sẽ chọn… vì…",
          "use": "Đưa quyết định kèm lý do",
          "pattern": "I would choose + option + because + clause",
          "simple": "I would choose a queue because the work can wait.",
          "example": "I would choose a pool because worker creation has overhead."
        }
      ],
      "terms": [
        {
          "term": "concurrency",
          "meaning": "Nhiều tác vụ cùng tiến triển trong một khoảng thời gian",
          "usage": "limit concurrency",
          "pitfall": "Không đồng nghĩa tất cả chạy CPU đồng thời."
        },
        {
          "term": "parallelism",
          "meaning": "Thực thi đồng thời trên nhiều tài nguyên",
          "usage": "run calculations in parallel",
          "pitfall": "Phân biệt với việc xen kẽ nhiều tác vụ."
        },
        {
          "term": "worker pool",
          "meaning": "Nhóm worker tái sử dụng",
          "usage": "size the worker pool",
          "pitfall": "worker_threads chạy JavaScript khác với libuv worker pool."
        },
        {
          "term": "overhead",
          "meaning": "Chi phí phụ để điều phối",
          "usage": "worker creation overhead",
          "pitfall": "Thường là danh từ không đếm được: adds overhead."
        },
        {
          "term": "bounded queue",
          "meaning": "Hàng đợi có giới hạn",
          "usage": "use a bounded queue",
          "pitfall": "Giới hạn phải có chính sách khi đầy, không chỉ một con số."
        }
      ],
      "checks": [
        {
          "question": "Which work benefits from workers here?",
          "model": "Heavy JavaScript calculations."
        },
        {
          "question": "Why avoid one worker per request?",
          "model": "Worker creation and too many active workers add memory and scheduling costs."
        },
        {
          "question": "What should be measured besides calculation time?",
          "model": "Queue wait, CPU use, and total request time."
        }
      ],
      "followups": [
        "How would you choose the pool size?",
        "What response would users get when the queue is full?",
        "How would you cancel work after a deadline?",
        "What is the difference between a worker thread and a separate process?"
      ],
      "quiz": [
        {
          "question": "A thousand requests need small network calls. What is a sensible starting point?",
          "options": [
            "Create a thousand worker threads.",
            "Use asynchronous I/O with a concurrency limit."
          ],
          "answer": 1,
          "explanation": "Network I/O usually does not need JavaScript worker threads."
        },
        {
          "question": "What prevents an unlimited backlog?",
          "options": [
            "A bounded queue with an overload policy.",
            "Increasing retries without limits."
          ],
          "answer": 0,
          "explanation": "Bounded work makes overload visible and limits resource use."
        }
      ],
      "sources": [
        [
          "Node.js · Worker threads",
          "https://nodejs.org/api/worker_threads.html"
        ]
      ]
    },
    {
      "id": "streams",
      "title": "Streams & backpressure",
      "stage": 0,
      "mission": "Mô tả luồng upload hoặc AI streaming và cách xử lý bên nhận chậm trong 90 giây.",
      "input": "Interviewer: Our export endpoint uses too much memory. What would you change?\nCandidate: In my experience, loading a full file before sending it is risky. The main bottleneck is the growing buffer when the receiver is slow. I would start by streaming the data and respecting backpressure. With a writable stream, a false return from write tells us to wait for drain before sending more. The trade-off is more careful error and cancellation handling. I would verify this by testing a slow client and watching memory use. For an AI response, I would also stop upstream work when the user disconnects. Streaming improves delivery behavior, but it does not make the model's final answer arrive instantly.",
      "chunks": [
        {
          "id": "c1",
          "text": "In my experience, …",
          "meaning": "Theo kinh nghiệm của tôi…",
          "use": "Mở câu với trải nghiệm đã có",
          "pattern": "In my experience, + clause",
          "simple": "In my experience, small changes are easier to review.",
          "example": "In my experience, slow clients can expose buffering problems."
        },
        {
          "id": "c2",
          "text": "The main bottleneck is …",
          "meaning": "Điểm nghẽn chính là…",
          "use": "Chỉ ra chỗ giới hạn hiệu năng",
          "pattern": "The main bottleneck is + noun phrase",
          "simple": "The main bottleneck is the database.",
          "example": "The main bottleneck is an unbounded buffer."
        },
        {
          "id": "c3",
          "text": "I would start by …",
          "meaning": "Tôi sẽ bắt đầu bằng…",
          "use": "Mô tả bước điều tra đầu tiên",
          "pattern": "I would start by + V-ing",
          "simple": "I would start by checking the logs.",
          "example": "I would start by respecting backpressure."
        },
        {
          "id": "c4",
          "text": "The trade-off is …",
          "meaning": "Điều phải đánh đổi là…",
          "use": "Nêu cái giá của một lựa chọn",
          "pattern": "The trade-off is + noun phrase",
          "simple": "The trade-off is higher memory use.",
          "example": "The trade-off is more cancellation handling."
        },
        {
          "id": "c5",
          "text": "I would verify this by …",
          "meaning": "Tôi sẽ kiểm chứng bằng…",
          "use": "Đưa bằng chứng thay vì khẳng định suông",
          "pattern": "I would verify this by + V-ing",
          "simple": "I would verify this by running a test.",
          "example": "I would verify this by simulating a slow client."
        }
      ],
      "terms": [
        {
          "term": "backpressure",
          "meaning": "Cơ chế báo bên gửi giảm tốc",
          "usage": "respect backpressure",
          "pitfall": "Không chỉ là network pressure; đó là phối hợp tốc độ producer/consumer."
        },
        {
          "term": "buffer",
          "meaning": "Vùng dữ liệu tạm trong bộ nhớ",
          "usage": "buffer incoming data",
          "pitfall": "Buffer vừa là danh từ vừa là động từ."
        },
        {
          "term": "producer",
          "meaning": "Bên tạo dữ liệu",
          "usage": "a fast producer",
          "pitfall": "Khác consumer là bên tiêu thụ dữ liệu."
        },
        {
          "term": "drain",
          "meaning": "Sự kiện báo có thể ghi tiếp",
          "usage": "wait for the drain event",
          "pitfall": "write trả false không có nghĩa chunk bị từ chối hay mất."
        },
        {
          "term": "cancellation",
          "meaning": "Hủy tác vụ đang thực hiện",
          "usage": "propagate cancellation",
          "pitfall": "Đóng UI chưa chắc tự dừng công việc ở upstream."
        }
      ],
      "checks": [
        {
          "question": "Why does memory grow?",
          "model": "The sender buffers data faster than the slow receiver consumes it."
        },
        {
          "question": "What should happen after write returns false?",
          "model": "Wait for drain before writing more data."
        },
        {
          "question": "What should happen when the user disconnects?",
          "model": "Propagate cancellation to upstream work where supported."
        }
      ],
      "followups": [
        "How would you handle an error halfway through a response?",
        "What happens if the upstream provider cannot cancel?",
        "How would you measure memory under a slow client?",
        "Would streaming reduce total model generation time?"
      ],
      "quiz": [
        {
          "question": "write returns false. What should the producer do?",
          "options": [
            "Immediately resend the same chunk.",
            "Wait for drain before further writes."
          ],
          "answer": 1,
          "explanation": "false is a backpressure signal, not a request to duplicate the chunk."
        },
        {
          "question": "The user closes an AI chat stream. What should the backend consider?",
          "options": [
            "Cancel upstream work and clean up resources.",
            "Keep generating indefinitely."
          ],
          "answer": 0,
          "explanation": "Cancellation reduces wasted work when the provider supports it."
        }
      ],
      "sources": [
        [
          "Node.js · Streams",
          "https://nodejs.org/api/stream.html"
        ]
      ]
    },
    {
      "id": "reliable-api",
      "title": "API contracts, retries & idempotency",
      "stage": 1,
      "mission": "Thiết kế API thanh toán hoặc AI job có retry an toàn; giải thích 1 failure mode.",
      "input": "Interviewer: A client times out and submits the same payment again. What should our API do?\nCandidate: It depends on the operation. A timeout does not prove that the first request failed. We need to make sure that repeated requests do not create repeated charges. One failure mode is two requests arriving at the same time with the same key. To reduce the risk, I would store an idempotency key with the operation result and enforce uniqueness atomically. I would choose bounded retries because repeated attempts can increase an outage. The contract should define key scope, retention, and what happens if a client reuses a key with a different payload. Similar rules help when an AI tool creates a paid job.",
      "chunks": [
        {
          "id": "c6",
          "text": "It depends on …",
          "meaning": "Điều đó phụ thuộc vào…",
          "use": "Nêu điều kiện quyết định",
          "pattern": "It depends on + noun phrase",
          "simple": "It depends on the traffic pattern.",
          "example": "It depends on whether the operation has side effects."
        },
        {
          "id": "c7",
          "text": "We need to make sure that …",
          "meaning": "Ta cần bảo đảm rằng…",
          "use": "Nêu điều kiện phải giữ đúng",
          "pattern": "We need to make sure that + clause",
          "simple": "We need to make sure that users can retry safely.",
          "example": "We need to make sure that retries do not create duplicate charges."
        },
        {
          "id": "c8",
          "text": "One failure mode is …",
          "meaning": "Một tình huống hệ thống lỗi là…",
          "use": "Dự đoán lỗi cụ thể",
          "pattern": "One failure mode is + noun phrase",
          "simple": "One failure mode is a duplicate payment.",
          "example": "One failure mode is concurrent requests with the same key."
        },
        {
          "id": "c9",
          "text": "To reduce the risk, …",
          "meaning": "Để giảm rủi ro…",
          "use": "Đề xuất biện pháp giảm thiểu",
          "pattern": "To reduce the risk, + clause",
          "simple": "To reduce the risk, I would limit retries.",
          "example": "To reduce the risk, I would enforce uniqueness atomically."
        },
        {
          "id": "c10",
          "text": "I would choose … because …",
          "meaning": "Tôi sẽ chọn… vì…",
          "use": "Đưa quyết định kèm lý do",
          "pattern": "I would choose + option + because + clause",
          "simple": "I would choose a queue because the work can wait.",
          "example": "I would choose bounded retries because retries add load."
        }
      ],
      "terms": [
        {
          "term": "idempotency",
          "meaning": "Tính chất lặp thao tác mà không tạo thêm tác động dự kiến",
          "usage": "an idempotency key",
          "pitfall": "Không đồng nghĩa request chỉ được gửi một lần."
        },
        {
          "term": "retry",
          "meaning": "Thử lại thao tác",
          "usage": "retry a request",
          "pitfall": "Động từ retry; danh từ số nhiều retries."
        },
        {
          "term": "exponential backoff",
          "meaning": "Tăng khoảng chờ giữa các lần thử",
          "usage": "use exponential backoff",
          "pitfall": "Cần giới hạn; không retry vô hạn."
        },
        {
          "term": "jitter",
          "meaning": "Độ ngẫu nhiên thêm vào thời gian chờ",
          "usage": "add jitter to retries",
          "pitfall": "Dùng để tránh nhiều client retry cùng thời điểm."
        },
        {
          "term": "side effect",
          "meaning": "Tác động làm thay đổi trạng thái bên ngoài",
          "usage": "a payment side effect",
          "pitfall": "Timeout không chứng minh side effect chưa xảy ra."
        }
      ],
      "checks": [
        {
          "question": "Why is retrying a payment risky?",
          "model": "The first request may already have charged the customer."
        },
        {
          "question": "Why must uniqueness be atomic?",
          "model": "Two concurrent requests could otherwise both pass a separate check."
        },
        {
          "question": "What belongs in the idempotency contract?",
          "model": "Key scope, retention, and behavior for a different payload under the same key."
        }
      ],
      "followups": [
        "What if the process crashes after charging but before saving the result?",
        "Where would you enforce uniqueness across replicas?",
        "Which errors should not be retried?",
        "How would this apply to a model calling a payment tool twice?"
      ],
      "quiz": [
        {
          "question": "A timeout means…",
          "options": [
            "The result is uncertain; the operation may have succeeded.",
            "The operation definitely did not happen."
          ],
          "answer": 0,
          "explanation": "A response may be lost after the side effect has happened."
        },
        {
          "question": "Two replicas see the same new key. What helps?",
          "options": [
            "Check a local Map in each replica only.",
            "Use shared atomic uniqueness and a defined in-progress state."
          ],
          "answer": 1,
          "explanation": "A per-process check cannot coordinate replicas."
        }
      ],
      "sources": [
        [
          "AWS · Timeouts, retries and backoff with jitter",
          "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
        ]
      ]
    },
    {
      "id": "transactions",
      "title": "Transactions & race conditions",
      "stage": 1,
      "mission": "Giải thích overselling bằng câu ngắn, chọn cách kiểm soát cạnh tranh và cách kiểm thử.",
      "input": "Interviewer: Two customers bought the last item. We already use transactions. Why did that happen?\nCandidate: It depends on the isolation level and the queries. A transaction alone does not make every read-and-write sequence safe. We need to make sure that stock cannot fall below zero. One failure mode is two requests reading the same old stock value. To reduce the risk, I would consider an atomic conditional update or an appropriate row lock. I would choose a short transaction because long locks can hurt other requests. I would check the affected row count and return a clear sold-out response. I would also test concurrent purchases, including retries after a serialization failure, rather than only testing one customer at a time.",
      "chunks": [
        {
          "id": "c6",
          "text": "It depends on …",
          "meaning": "Điều đó phụ thuộc vào…",
          "use": "Nêu điều kiện quyết định",
          "pattern": "It depends on + noun phrase",
          "simple": "It depends on the traffic pattern.",
          "example": "It depends on the isolation level."
        },
        {
          "id": "c7",
          "text": "We need to make sure that …",
          "meaning": "Ta cần bảo đảm rằng…",
          "use": "Nêu điều kiện phải giữ đúng",
          "pattern": "We need to make sure that + clause",
          "simple": "We need to make sure that users can retry safely.",
          "example": "We need to make sure that stock stays nonnegative."
        },
        {
          "id": "c8",
          "text": "One failure mode is …",
          "meaning": "Một tình huống hệ thống lỗi là…",
          "use": "Dự đoán lỗi cụ thể",
          "pattern": "One failure mode is + noun phrase",
          "simple": "One failure mode is a duplicate payment.",
          "example": "One failure mode is two buyers reading the same stock value."
        },
        {
          "id": "c9",
          "text": "To reduce the risk, …",
          "meaning": "Để giảm rủi ro…",
          "use": "Đề xuất biện pháp giảm thiểu",
          "pattern": "To reduce the risk, + clause",
          "simple": "To reduce the risk, I would limit retries.",
          "example": "To reduce the risk, I would use a conditional update."
        },
        {
          "id": "c10",
          "text": "I would choose … because …",
          "meaning": "Tôi sẽ chọn… vì…",
          "use": "Đưa quyết định kèm lý do",
          "pattern": "I would choose + option + because + clause",
          "simple": "I would choose a queue because the work can wait.",
          "example": "I would choose a short transaction because long locks cause contention."
        }
      ],
      "terms": [
        {
          "term": "race condition",
          "meaning": "Lỗi phụ thuộc vào thứ tự hoặc thời điểm thực thi",
          "usage": "prevent a race condition",
          "pitfall": "Không phải mọi lỗi ngẫu nhiên đều là race condition."
        },
        {
          "term": "isolation level",
          "meaning": "Mức cách ly giao dịch",
          "usage": "choose an isolation level",
          "pitfall": "Transaction không tự có mức cách ly cao nhất."
        },
        {
          "term": "atomicity",
          "meaning": "Tính tất cả hoặc không gì của thao tác/giao dịch",
          "usage": "preserve atomicity",
          "pitfall": "Khác isolation; cần nói rõ phạm vi atomic."
        },
        {
          "term": "row lock",
          "meaning": "Khóa ở mức hàng dữ liệu",
          "usage": "acquire a row lock",
          "pitfall": "Acquire/release a lock, không nói open/close a lock."
        },
        {
          "term": "contention",
          "meaning": "Tranh chấp tài nguyên",
          "usage": "reduce lock contention",
          "pitfall": "Khác conflict logic nghiệp vụ; thường nói lock contention."
        }
      ],
      "checks": [
        {
          "question": "Why might a transaction still allow the problem?",
          "model": "The isolation level and query sequence may allow competing reads."
        },
        {
          "question": "Name one proposed protection.",
          "model": "An atomic conditional update or an appropriate row lock."
        },
        {
          "question": "Which test is missing from single-customer tests?",
          "model": "Concurrent purchases and failure/retry paths."
        }
      ],
      "followups": [
        "What does UPDATE stock SET quantity = quantity - 1 WHERE item_id = $1 AND quantity > 0 achieve?",
        "What would you do if zero rows were updated?",
        "Could a lock protect a remote payment call too?",
        "How would you handle deadlocks or serialization failures?"
      ],
      "quiz": [
        {
          "question": "A conditional stock update affects zero rows. What is appropriate?",
          "options": [
            "Continue and confirm the purchase.",
            "Handle the unmet condition instead of assuming success."
          ],
          "answer": 1,
          "explanation": "Check whether the operation actually changed a row."
        },
        {
          "question": "A transaction guarantees all concurrent flows are serializable by default.",
          "options": [
            "True for every database.",
            "False; inspect the isolation level and database behavior."
          ],
          "answer": 1,
          "explanation": "Atomicity and serializable isolation are different guarantees."
        }
      ],
      "sources": [
        [
          "PostgreSQL · Transaction isolation",
          "https://www.postgresql.org/docs/current/transaction-iso.html"
        ]
      ]
    },
    {
      "id": "cache-queues",
      "title": "Caching, queues & consistency",
      "stage": 1,
      "mission": "So sánh freshness và availability; giải thích xử lý trùng message bằng ví dụ.",
      "input": "Interviewer: Can we cache every order status and process updates through a queue?\nCandidate: It depends on how fresh the status must be. We need to make sure that customers understand when an update is still pending. One failure mode is serving an old status after a payment succeeds. To reduce the risk, I would define a freshness limit and invalidate affected cache entries after committed changes. I would choose durable storage as the source of truth because cached data can expire or disappear. A queue consumer also needs to handle duplicate deliveries. We should make its side effects idempotent and acknowledge work only after the required durable changes. A failed message needs a visible recovery path, not endless silent retries.",
      "chunks": [
        {
          "id": "c6",
          "text": "It depends on …",
          "meaning": "Điều đó phụ thuộc vào…",
          "use": "Nêu điều kiện quyết định",
          "pattern": "It depends on + noun phrase",
          "simple": "It depends on the traffic pattern.",
          "example": "It depends on the freshness requirement."
        },
        {
          "id": "c7",
          "text": "We need to make sure that …",
          "meaning": "Ta cần bảo đảm rằng…",
          "use": "Nêu điều kiện phải giữ đúng",
          "pattern": "We need to make sure that + clause",
          "simple": "We need to make sure that users can retry safely.",
          "example": "We need to make sure that pending updates are visible."
        },
        {
          "id": "c8",
          "text": "One failure mode is …",
          "meaning": "Một tình huống hệ thống lỗi là…",
          "use": "Dự đoán lỗi cụ thể",
          "pattern": "One failure mode is + noun phrase",
          "simple": "One failure mode is a duplicate payment.",
          "example": "One failure mode is serving stale order data."
        },
        {
          "id": "c9",
          "text": "To reduce the risk, …",
          "meaning": "Để giảm rủi ro…",
          "use": "Đề xuất biện pháp giảm thiểu",
          "pattern": "To reduce the risk, + clause",
          "simple": "To reduce the risk, I would limit retries.",
          "example": "To reduce the risk, I would invalidate affected entries."
        },
        {
          "id": "c10",
          "text": "I would choose … because …",
          "meaning": "Tôi sẽ chọn… vì…",
          "use": "Đưa quyết định kèm lý do",
          "pattern": "I would choose + option + because + clause",
          "simple": "I would choose a queue because the work can wait.",
          "example": "I would choose durable storage because the cache can disappear."
        }
      ],
      "terms": [
        {
          "term": "cache invalidation",
          "meaning": "Loại bỏ dữ liệu cache không còn hợp lệ",
          "usage": "invalidate a cache entry",
          "pitfall": "Invalidate khác refresh: xóa hiệu lực không nhất thiết tải lại ngay."
        },
        {
          "term": "TTL (time to live)",
          "meaning": "Thời gian dữ liệu được giữ trước khi hết hạn",
          "usage": "set a TTL",
          "pitfall": "TTL không đảm bảo cache luôn khớp dữ liệu gốc."
        },
        {
          "term": "eventual consistency",
          "meaning": "Tính nhất quán sau khi các cập nhật được truyền và hệ ổn định",
          "usage": "an eventually consistent view",
          "pitfall": "Không hứa thời hạn cụ thể nếu hệ thống chưa có cam kết đó."
        },
        {
          "term": "at-least-once delivery",
          "meaning": "Giao ít nhất một lần; có thể trùng",
          "usage": "handle at-least-once delivery",
          "pitfall": "Không đồng nghĩa exactly-once side effects."
        },
        {
          "term": "dead-letter queue",
          "meaning": "Nơi giữ message không xử lý được theo chính sách",
          "usage": "inspect the dead-letter queue",
          "pitfall": "Cần người/quy trình xử lý lại, không phải nơi quên lỗi."
        }
      ],
      "checks": [
        {
          "question": "What determines whether cached order status is acceptable?",
          "model": "The freshness requirement and how pending updates are presented."
        },
        {
          "question": "Why must a consumer handle duplicates?",
          "model": "Delivery may occur more than once."
        },
        {
          "question": "When should it acknowledge work?",
          "model": "After the required durable changes have succeeded."
        }
      ],
      "followups": [
        "What happens if invalidation fails after commit?",
        "How would you prevent many cache misses from overwhelming the database?",
        "What if a consumer crashes after writing but before acknowledging?",
        "How would you safely replay a dead-letter message?"
      ],
      "quiz": [
        {
          "question": "A cache has a five-minute TTL. Is every response fresh?",
          "options": [
            "No; it can be stale within that period.",
            "Yes; expiry guarantees freshness."
          ],
          "answer": 0,
          "explanation": "TTL bounds retention, not synchronization with every write."
        },
        {
          "question": "A message is redelivered after a consumer crash. What matters?",
          "options": [
            "Ignore duplicate handling because a queue exists.",
            "Make side effects idempotent and track durable processing state."
          ],
          "answer": 1,
          "explanation": "A broker delivery guarantee does not automatically protect business side effects."
        }
      ],
      "sources": [
        [
          "Redis · Keyspace and expiration",
          "https://redis.io/docs/latest/develop/using-commands/keyspace/"
        ]
      ]
    },
    {
      "id": "rag",
      "title": "RAG & retrieval quality",
      "stage": 2,
      "mission": "Trình bày thiết kế trợ lý tài liệu nội bộ: retrieval, quyền truy cập và câu trả lời có căn cứ.",
      "input": "Interviewer: How would you build an assistant for our internal documentation?\nCandidate: Let me clarify the requirement. Should it answer only from documents that the employee can access? The goal is to retrieve relevant passages and give an answer with sources. We can split documents into chunks, create embeddings, and retrieve candidates for each question. This does not guarantee a correct or complete answer. Before we generate, we should filter by access rights and inspect retrieval quality. If retrieval fails, we can ask for clarification or say that the available sources are insufficient. I would test questions with known evidence and questions with no answer. I would also track document versions so that an old policy does not look like current guidance.",
      "chunks": [
        {
          "id": "c11",
          "text": "Let me clarify the requirement.",
          "meaning": "Cho tôi làm rõ yêu cầu.",
          "use": "Hỏi lại trước khi thiết kế",
          "pattern": "Let me clarify + noun phrase",
          "simple": "Let me clarify the expected response time.",
          "example": "Let me clarify the access requirement."
        },
        {
          "id": "c12",
          "text": "The goal is to …",
          "meaning": "Mục tiêu là…",
          "use": "Chốt mục tiêu sản phẩm",
          "pattern": "The goal is to + verb",
          "simple": "The goal is to help users find answers.",
          "example": "The goal is to answer using accessible documents."
        },
        {
          "id": "c13",
          "text": "This does not guarantee …",
          "meaning": "Điều này không bảo đảm…",
          "use": "Nói rõ giới hạn giải pháp",
          "pattern": "This does not guarantee + noun phrase",
          "simple": "This does not guarantee a correct answer.",
          "example": "This does not guarantee factual accuracy."
        },
        {
          "id": "c14",
          "text": "Before we …, we should …",
          "meaning": "Trước khi… ta nên…",
          "use": "Nêu bước kiểm tra cần đi trước",
          "pattern": "Before we + verb, we should + verb",
          "simple": "Before we release, we should test real cases.",
          "example": "Before we generate, we should check retrieval quality."
        },
        {
          "id": "c15",
          "text": "If … fails, we can …",
          "meaning": "Nếu… lỗi, ta có thể…",
          "use": "Giải thích phương án dự phòng",
          "pattern": "If + subject + fails, we can + verb",
          "simple": "If the service fails, we can return a clear error.",
          "example": "If retrieval fails, we can ask for clarification."
        }
      ],
      "terms": [
        {
          "term": "RAG (retrieval-augmented generation)",
          "meaning": "Sinh câu trả lời có bổ sung ngữ cảnh truy xuất",
          "usage": "build a RAG pipeline",
          "pitfall": "RAG không đồng nghĩa fine-tuning và không loại bỏ mọi hallucination."
        },
        {
          "term": "embedding",
          "meaning": "Biểu diễn dữ liệu bằng vector",
          "usage": "generate document embeddings",
          "pitfall": "Similarity của vector không phải bằng chứng sự thật."
        },
        {
          "term": "retrieval",
          "meaning": "Truy xuất thông tin ứng viên",
          "usage": "evaluate retrieval quality",
          "pitfall": "Retrieve là động từ; retrieval là danh từ."
        },
        {
          "term": "grounding",
          "meaning": "Gắn câu trả lời với bằng chứng/ngữ cảnh",
          "usage": "ground answers in documents",
          "pitfall": "Có trích dẫn vẫn cần kiểm tra trích dẫn có hỗ trợ phát biểu không."
        },
        {
          "term": "hallucination",
          "meaning": "Nội dung mô hình tạo ra không có căn cứ hoặc sai",
          "usage": "reduce hallucinations",
          "pitfall": "Không nên nói eliminate hallucinations nếu không có bảo đảm."
        }
      ],
      "checks": [
        {
          "question": "Which access constraint comes first?",
          "model": "Retrieve only documents the employee is authorized to access."
        },
        {
          "question": "What does retrieval not guarantee?",
          "model": "A correct or complete answer."
        },
        {
          "question": "Why test questions with no answer?",
          "model": "To check whether the system abstains instead of inventing evidence."
        }
      ],
      "followups": [
        "How would you separate retrieval failure from generation failure?",
        "How would you handle changed or deleted documents?",
        "Where would you enforce tenant isolation?",
        "When would a keyword search help more than vector similarity?"
      ],
      "quiz": [
        {
          "question": "The top passage is semantically similar but belongs to another tenant.",
          "options": [
            "Filter by authorization before exposing it to the model or user.",
            "Use it because similarity is high."
          ],
          "answer": 0,
          "explanation": "Relevance is not permission."
        },
        {
          "question": "RAG and fine-tuning are…",
          "options": [
            "The same process.",
            "Different approaches; retrieval supplies context at query time."
          ],
          "answer": 1,
          "explanation": "Fine-tuning changes model weights; RAG supplies retrieved context."
        }
      ],
      "sources": [
        [
          "Microsoft · RAG overview",
          "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"
        ]
      ]
    },
    {
      "id": "tool-calling",
      "title": "Tool calling & agent boundaries",
      "stage": 2,
      "mission": "Giải thích vòng tool call bằng Node.js backend; phân biệt model đề xuất và server thực thi.",
      "input": "Interviewer: Can the model directly refund an order through a tool?\nCandidate: Let me clarify the requirement. Do we want a suggestion or an approved action? The goal is to let the assistant request a narrow operation while our backend controls execution. The model proposes a tool name and arguments. Our application checks the schema, the user's permissions, and business rules before calling a service. This does not guarantee the requested action is appropriate just because the JSON is valid. Before we issue a refund, we should confirm the amount and authorization. If the tool fails, we can return a structured error and stop or retry within a limit. We also need an audit trail and protection against duplicate actions.",
      "chunks": [
        {
          "id": "c11",
          "text": "Let me clarify the requirement.",
          "meaning": "Cho tôi làm rõ yêu cầu.",
          "use": "Hỏi lại trước khi thiết kế",
          "pattern": "Let me clarify + noun phrase",
          "simple": "Let me clarify the expected response time.",
          "example": "Let me clarify who can approve a refund."
        },
        {
          "id": "c12",
          "text": "The goal is to …",
          "meaning": "Mục tiêu là…",
          "use": "Chốt mục tiêu sản phẩm",
          "pattern": "The goal is to + verb",
          "simple": "The goal is to help users find answers.",
          "example": "The goal is to keep execution under backend control."
        },
        {
          "id": "c13",
          "text": "This does not guarantee …",
          "meaning": "Điều này không bảo đảm…",
          "use": "Nói rõ giới hạn giải pháp",
          "pattern": "This does not guarantee + noun phrase",
          "simple": "This does not guarantee a correct answer.",
          "example": "This does not guarantee authorization."
        },
        {
          "id": "c14",
          "text": "Before we …, we should …",
          "meaning": "Trước khi… ta nên…",
          "use": "Nêu bước kiểm tra cần đi trước",
          "pattern": "Before we + verb, we should + verb",
          "simple": "Before we release, we should test real cases.",
          "example": "Before we issue a refund, we should validate the request."
        },
        {
          "id": "c15",
          "text": "If … fails, we can …",
          "meaning": "Nếu… lỗi, ta có thể…",
          "use": "Giải thích phương án dự phòng",
          "pattern": "If + subject + fails, we can + verb",
          "simple": "If the service fails, we can return a clear error.",
          "example": "If the tool fails, we can return a structured error."
        }
      ],
      "terms": [
        {
          "term": "function calling / tool calling",
          "meaning": "Mô hình yêu cầu gọi công cụ theo giao thức",
          "usage": "handle a tool call",
          "pitfall": "Model tạo yêu cầu; code ứng dụng thực thi thao tác."
        },
        {
          "term": "schema",
          "meaning": "Cấu trúc và ràng buộc dữ liệu",
          "usage": "validate arguments against a schema",
          "pitfall": "Schema hợp lệ không chứng minh đủ quyền hay đúng nghiệp vụ."
        },
        {
          "term": "authorization",
          "meaning": "Kiểm tra được phép làm gì",
          "usage": "enforce authorization",
          "pitfall": "Khác authentication là xác minh danh tính."
        },
        {
          "term": "least privilege",
          "meaning": "Chỉ cấp quyền tối thiểu cần thiết",
          "usage": "apply least privilege",
          "pitfall": "Không trao toàn quyền DB chỉ vì tool cần đọc một bảng."
        },
        {
          "term": "audit trail",
          "meaning": "Dấu vết các hành động để kiểm tra",
          "usage": "keep an audit trail",
          "pitfall": "Cần ghi chủ thể, thao tác, kết quả; tránh ghi bí mật không cần thiết."
        }
      ],
      "checks": [
        {
          "question": "Who executes the operation?",
          "model": "The application backend, after checking the proposed call."
        },
        {
          "question": "Why is valid JSON insufficient?",
          "model": "It does not prove permissions or business correctness."
        },
        {
          "question": "What is needed besides validation?",
          "model": "Approval where required, audit records, bounded retries, and duplicate-action protection."
        }
      ],
      "followups": [
        "What happens when the model requests an unknown tool?",
        "How would you scope a tool to one tenant?",
        "Can a tool result contain malicious instructions?",
        "How would you prevent an agent from looping forever?"
      ],
      "quiz": [
        {
          "question": "The model returns a valid refund schema. What is still needed?",
          "options": [
            "Nothing; valid JSON is approval.",
            "Server-side permission and business-rule checks."
          ],
          "answer": 1,
          "explanation": "Syntactic validity does not authorize an action."
        },
        {
          "question": "The same tool call arrives twice. What backend feature helps?",
          "options": [
            "Idempotent operation handling.",
            "A longer system prompt alone."
          ],
          "answer": 0,
          "explanation": "Protect effects in application logic, including retries and duplicates."
        }
      ],
      "sources": [
        [
          "OpenAI · Function calling",
          "https://developers.openai.com/api/docs/guides/function-calling"
        ]
      ]
    },
    {
      "id": "evals",
      "title": "AI evaluation, cost & latency",
      "stage": 2,
      "mission": "Đề xuất cách so sánh hai cấu hình AI bằng eval và ngân sách; tránh nói good model chung chung.",
      "input": "Interviewer: A new model looks better in a demo. Should we replace our current one?\nCandidate: Let me clarify the requirement. Which user tasks and failure costs matter most? The goal is to improve useful answers within our latency and cost budgets. This does not guarantee that a more expensive model will perform better on our task. Before we release, we should run a representative evaluation set, including difficult and unsupported questions. If quality falls, we can keep the previous configuration. I would compare factual support, task success, time to first token, total response time, and cost per completed task. Human review can check a sample of failures. The thresholds should be agreed before comparing results, and we should watch real traffic after a limited rollout.",
      "chunks": [
        {
          "id": "c11",
          "text": "Let me clarify the requirement.",
          "meaning": "Cho tôi làm rõ yêu cầu.",
          "use": "Hỏi lại trước khi thiết kế",
          "pattern": "Let me clarify + noun phrase",
          "simple": "Let me clarify the expected response time.",
          "example": "Let me clarify what counts as a successful answer."
        },
        {
          "id": "c12",
          "text": "The goal is to …",
          "meaning": "Mục tiêu là…",
          "use": "Chốt mục tiêu sản phẩm",
          "pattern": "The goal is to + verb",
          "simple": "The goal is to help users find answers.",
          "example": "The goal is to improve task success within budget."
        },
        {
          "id": "c13",
          "text": "This does not guarantee …",
          "meaning": "Điều này không bảo đảm…",
          "use": "Nói rõ giới hạn giải pháp",
          "pattern": "This does not guarantee + noun phrase",
          "simple": "This does not guarantee a correct answer.",
          "example": "This does not guarantee better results on our task."
        },
        {
          "id": "c14",
          "text": "Before we …, we should …",
          "meaning": "Trước khi… ta nên…",
          "use": "Nêu bước kiểm tra cần đi trước",
          "pattern": "Before we + verb, we should + verb",
          "simple": "Before we release, we should test real cases.",
          "example": "Before we release, we should run the evaluation set."
        },
        {
          "id": "c15",
          "text": "If … fails, we can …",
          "meaning": "Nếu… lỗi, ta có thể…",
          "use": "Giải thích phương án dự phòng",
          "pattern": "If + subject + fails, we can + verb",
          "simple": "If the service fails, we can return a clear error.",
          "example": "If quality falls, we can keep the previous configuration."
        }
      ],
      "terms": [
        {
          "term": "evaluation set",
          "meaning": "Tập tình huống để đánh giá",
          "usage": "build a representative evaluation set",
          "pitfall": "Một demo thành công không đại diện toàn bộ nhu cầu."
        },
        {
          "term": "regression",
          "meaning": "Sự giảm chất lượng so với trước",
          "usage": "catch a quality regression",
          "pitfall": "Không chỉ là lỗi code; chất lượng trả lời cũng có regression."
        },
        {
          "term": "TTFT (time to first token)",
          "meaning": "Thời gian đến token đầu tiên",
          "usage": "measure TTFT",
          "pitfall": "TTFT thấp không đồng nghĩa tổng thời gian trả lời thấp."
        },
        {
          "term": "precision",
          "meaning": "Tỷ lệ kết quả được chọn là đúng theo tiêu chí",
          "usage": "measure retrieval precision",
          "pitfall": "Phân biệt recall: phần kết quả đúng đã tìm được trong tổng cần tìm."
        },
        {
          "term": "token budget",
          "meaning": "Giới hạn số token dự kiến dùng",
          "usage": "set a token budget",
          "pitfall": "Token không luôn tương đương một từ; đo usage thực tế."
        }
      ],
      "checks": [
        {
          "question": "Why is a demo not enough?",
          "model": "It may not represent real tasks, difficult cases, or costly failures."
        },
        {
          "question": "What latency measures are mentioned?",
          "model": "Time to first token and total response time."
        },
        {
          "question": "When should thresholds be agreed?",
          "model": "Before comparing the candidate configurations."
        }
      ],
      "followups": [
        "How would you keep evaluation data separate from tuning examples?",
        "How would you assess an answer with correct facts but no useful action?",
        "Would you trust a model judge for every safety decision?",
        "What changes if a cheaper model needs more retries?"
      ],
      "quiz": [
        {
          "question": "Which is a fair comparison?",
          "options": [
            "Use different easy cases for each model.",
            "Use a shared representative set and pre-agreed criteria."
          ],
          "answer": 1,
          "explanation": "Comparable tasks and criteria make the trade-off assessable."
        },
        {
          "question": "Model A is cheaper per token but retries twice as often. What should you compare?",
          "options": [
            "Cost per completed task, alongside quality and latency.",
            "Only list price per token."
          ],
          "answer": 0,
          "explanation": "Retries and task outcomes affect real cost."
        }
      ],
      "sources": [
        [
          "OpenAI · Evaluation workflow",
          "https://developers.openai.com/api/docs/guides/evals"
        ]
      ]
    },
    {
      "id": "ai-security",
      "title": "Prompt injection & data boundaries",
      "stage": 3,
      "mission": "Mô tả tấn công qua tài liệu/tool output và bảo vệ dữ liệu ở tầng ứng dụng.",
      "input": "Interviewer: A retrieved document tells the assistant to ignore its rules and send customer data elsewhere. What now?\nCandidate: The evidence suggests that this is an instruction hidden in untrusted content. First, I would block unauthorized actions; then I would investigate how that content entered the system. Compared with a prompt-only defense, server-side permissions give us a separate control boundary. I would roll back if the new workflow exposed private data or enabled unexpected actions. What I learned was that document relevance and document trust are different questions. We should treat retrieved text and tool output as data, restrict available tools, and test hostile inputs. We should also avoid putting secrets into context when the task does not need them.",
      "chunks": [
        {
          "id": "c16",
          "text": "The evidence suggests that …",
          "meaning": "Bằng chứng gợi ý rằng…",
          "use": "Nêu kết luận còn cần kiểm chứng",
          "pattern": "The evidence suggests that + clause",
          "simple": "The evidence suggests that the change caused the delay.",
          "example": "The evidence suggests that the document contains a prompt injection."
        },
        {
          "id": "c17",
          "text": "First, I would …; then I would …",
          "meaning": "Đầu tiên tôi sẽ… rồi…",
          "use": "Trình bày trình tự xử lý",
          "pattern": "First, I would + verb; then I would + verb",
          "simple": "First, I would reduce traffic; then I would investigate.",
          "example": "First, I would disable the affected tool; then I would investigate."
        },
        {
          "id": "c18",
          "text": "Compared with …, …",
          "meaning": "So với…, …",
          "use": "So sánh trên cùng tiêu chí",
          "pattern": "Compared with + noun, + clause",
          "simple": "Compared with the old version, this uses less memory.",
          "example": "Compared with a prompt-only defense, permissions add a separate boundary."
        },
        {
          "id": "c19",
          "text": "I would roll back if …",
          "meaning": "Tôi sẽ rollback nếu…",
          "use": "Đặt điều kiện dừng hoặc quay lui",
          "pattern": "I would roll back if + clause",
          "simple": "I would roll back if the error rate increased.",
          "example": "I would roll back if private data became accessible."
        },
        {
          "id": "c20",
          "text": "What I learned was …",
          "meaning": "Điều tôi học được là…",
          "use": "Kết luận bằng bài học có thể áp dụng",
          "pattern": "What I learned was + noun phrase / that-clause",
          "simple": "What I learned was that we needed better tests.",
          "example": "What I learned was that relevance does not imply trust."
        }
      ],
      "terms": [
        {
          "term": "prompt injection",
          "meaning": "Chỉ dẫn độc hại trà trộn trong input/ngữ cảnh",
          "usage": "test for prompt injection",
          "pitfall": "Khác SQL injection; không giải quyết chỉ bằng escaping SQL."
        },
        {
          "term": "untrusted input",
          "meaning": "Dữ liệu chưa được tin cậy",
          "usage": "treat tool output as untrusted input",
          "pitfall": "Nội dung được truy xuất không tự trở thành chỉ dẫn hệ thống."
        },
        {
          "term": "data exfiltration",
          "meaning": "Đưa dữ liệu ra ngoài trái phép",
          "usage": "prevent data exfiltration",
          "pitfall": "Không chỉ là trả lời sai; đó là rò rỉ dữ liệu."
        },
        {
          "term": "trust boundary",
          "meaning": "Ranh giới thay đổi mức tin cậy/quyền",
          "usage": "enforce a trust boundary",
          "pitfall": "Prompt là hướng dẫn, không thay thế kiểm tra quyền."
        },
        {
          "term": "allowlist",
          "meaning": "Danh sách được phép",
          "usage": "use a tool allowlist",
          "pitfall": "Danh sách tool được phép vẫn cần kiểm tra arguments và quyền."
        }
      ],
      "checks": [
        {
          "question": "Where is the hostile instruction?",
          "model": "Inside a retrieved document, which is untrusted content."
        },
        {
          "question": "Why are prompts alone insufficient?",
          "model": "The backend must independently restrict access and actions."
        },
        {
          "question": "What should be kept out of context unless needed?",
          "model": "Secrets and unnecessary sensitive information."
        }
      ],
      "followups": [
        "How would you validate a URL requested by a tool call?",
        "Could a trusted tool return untrusted content?",
        "How would you test cross-tenant leakage?",
        "What would an incident audit need without logging raw secrets?"
      ],
      "quiz": [
        {
          "question": "A retrieved document asks to export customer data. What should determine permission?",
          "options": [
            "The document says it is urgent.",
            "Authenticated user scope and server-side policy."
          ],
          "answer": 1,
          "explanation": "Untrusted text cannot grant permissions."
        },
        {
          "question": "Which defense is useful?",
          "options": [
            "Only tell the model to be careful.",
            "Restrict tools, minimize data, enforce permissions, and test attacks."
          ],
          "answer": 1,
          "explanation": "Layered application controls reduce dependence on model compliance."
        }
      ],
      "sources": [
        [
          "OWASP · LLM application risks",
          "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
        ]
      ]
    },
    {
      "id": "production",
      "title": "Production incidents & observability",
      "stage": 3,
      "mission": "Kể sự cố Node.js + AI theo impact → evidence → mitigation → prevention trong 2 phút.",
      "input": "Interviewer: Our AI endpoint slowed down after a release. How would you respond?\nCandidate: The evidence suggests that the release may be related, but I would not call it the root cause yet. First, I would check customer impact; then I would compare traces before and after the change. Compared with application logs alone, traces help us see time across retrieval, model calls, and tool execution. I would roll back if the agreed error or latency limit was exceeded. What I learned was that a useful incident report separates facts from hypotheses. After reducing impact, I would inspect queue wait, retry volume, and provider time. I would share the next update time and add a regression test once we understand the cause.",
      "chunks": [
        {
          "id": "c16",
          "text": "The evidence suggests that …",
          "meaning": "Bằng chứng gợi ý rằng…",
          "use": "Nêu kết luận còn cần kiểm chứng",
          "pattern": "The evidence suggests that + clause",
          "simple": "The evidence suggests that the change caused the delay.",
          "example": "The evidence suggests that retries increased after the release."
        },
        {
          "id": "c17",
          "text": "First, I would …; then I would …",
          "meaning": "Đầu tiên tôi sẽ… rồi…",
          "use": "Trình bày trình tự xử lý",
          "pattern": "First, I would + verb; then I would + verb",
          "simple": "First, I would reduce traffic; then I would investigate.",
          "example": "First, I would reduce impact; then I would investigate."
        },
        {
          "id": "c18",
          "text": "Compared with …, …",
          "meaning": "So với…, …",
          "use": "So sánh trên cùng tiêu chí",
          "pattern": "Compared with + noun, + clause",
          "simple": "Compared with the old version, this uses less memory.",
          "example": "Compared with logs alone, traces show the request path."
        },
        {
          "id": "c19",
          "text": "I would roll back if …",
          "meaning": "Tôi sẽ rollback nếu…",
          "use": "Đặt điều kiện dừng hoặc quay lui",
          "pattern": "I would roll back if + clause",
          "simple": "I would roll back if the error rate increased.",
          "example": "I would roll back if the latency limit was exceeded."
        },
        {
          "id": "c20",
          "text": "What I learned was …",
          "meaning": "Điều tôi học được là…",
          "use": "Kết luận bằng bài học có thể áp dụng",
          "pattern": "What I learned was + noun phrase / that-clause",
          "simple": "What I learned was that we needed better tests.",
          "example": "What I learned was that hypotheses need evidence."
        }
      ],
      "terms": [
        {
          "term": "observability",
          "meaning": "Khả năng hiểu trạng thái hệ qua tín hiệu xuất ra",
          "usage": "improve observability",
          "pitfall": "Không chỉ có dashboard; cần tín hiệu đủ để điều tra."
        },
        {
          "term": "distributed trace",
          "meaning": "Dấu vết một thao tác qua nhiều thành phần",
          "usage": "inspect a distributed trace",
          "pitfall": "Trace nối nhiều span; không đồng nghĩa một dòng log."
        },
        {
          "term": "span",
          "meaning": "Một đơn vị công việc trong trace",
          "usage": "add a span around retrieval",
          "pitfall": "Span có thời gian và ngữ cảnh, không chỉ tên sự kiện."
        },
        {
          "term": "root cause",
          "meaning": "Nguyên nhân gốc đã có bằng chứng",
          "usage": "identify the root cause",
          "pitfall": "Correlation sau deploy chưa chứng minh root cause."
        },
        {
          "term": "mitigation",
          "meaning": "Biện pháp giảm ảnh hưởng trước mắt",
          "usage": "apply a mitigation",
          "pitfall": "Mitigation có thể chưa sửa tận gốc; phân biệt với permanent fix."
        }
      ],
      "checks": [
        {
          "question": "Is the release already proven to be the root cause?",
          "model": "No. It is a hypothesis linked to timing."
        },
        {
          "question": "Which parts of a request should traces cover?",
          "model": "Retrieval, model calls, and tool execution."
        },
        {
          "question": "What comes before a deep investigation?",
          "model": "Checking and reducing customer impact."
        }
      ],
      "followups": [
        "What would you say to a stakeholder while the cause is unknown?",
        "How would you distinguish provider latency from queue wait?",
        "Which sensitive fields should you avoid logging?",
        "How would you prove that the fix prevents recurrence?"
      ],
      "quiz": [
        {
          "question": "Latency rose after a deployment. Which wording is accurate?",
          "options": [
            "The deployment is certainly the only cause.",
            "The timing suggests a link; we need evidence."
          ],
          "answer": 1,
          "explanation": "Report a hypothesis as a hypothesis until supported."
        },
        {
          "question": "Rollback restores service. Is investigation finished?",
          "options": [
            "No; follow up on cause and prevention.",
            "Yes; recovery proves the root cause."
          ],
          "answer": 0,
          "explanation": "Mitigation and causal analysis are different tasks."
        }
      ],
      "sources": [
        [
          "OpenTelemetry · Signals",
          "https://opentelemetry.io/docs/concepts/signals/"
        ]
      ]
    },
    {
      "id": "mock-interview",
      "title": "Mock interview · Design an AI support backend",
      "stage": 3,
      "mission": "Phỏng vấn tổng hợp 6 lượt: thiết kế Node.js API cho AI support, nêu trade-off, failure và phép đo. Nói 2–3 phút.",
      "input": "Interviewer: Design an AI support backend for multiple business customers. Where do you begin?\nCandidate: Let me clarify the requirement. What traffic, data boundaries, and response time do we expect? The goal is to answer useful questions without exposing another customer's data. I would start by defining the request flow: authorize, retrieve allowed documents, generate, and validate any proposed tool action. The trade-off is more checks and latency in exchange for controlled access. I would verify this by testing tenant isolation, unsupported questions, slow clients, and duplicate tool calls. I would use bounded work and monitor both model quality and backend reliability. For a first release, I would keep tools read-only and expand only after the evaluation and operational evidence support that decision.",
      "chunks": [
        {
          "id": "c11",
          "text": "Let me clarify the requirement.",
          "meaning": "Cho tôi làm rõ yêu cầu.",
          "use": "Hỏi lại trước khi thiết kế",
          "pattern": "Let me clarify + noun phrase",
          "simple": "Let me clarify the expected response time.",
          "example": "Let me clarify the traffic and access requirements."
        },
        {
          "id": "c12",
          "text": "The goal is to …",
          "meaning": "Mục tiêu là…",
          "use": "Chốt mục tiêu sản phẩm",
          "pattern": "The goal is to + verb",
          "simple": "The goal is to help users find answers.",
          "example": "The goal is to answer without cross-tenant leakage."
        },
        {
          "id": "c3",
          "text": "I would start by …",
          "meaning": "Tôi sẽ bắt đầu bằng…",
          "use": "Mô tả bước điều tra đầu tiên",
          "pattern": "I would start by + V-ing",
          "simple": "I would start by checking the logs.",
          "example": "I would start by defining the request flow."
        },
        {
          "id": "c4",
          "text": "The trade-off is …",
          "meaning": "Điều phải đánh đổi là…",
          "use": "Nêu cái giá của một lựa chọn",
          "pattern": "The trade-off is + noun phrase",
          "simple": "The trade-off is higher memory use.",
          "example": "The trade-off is more checks and latency."
        },
        {
          "id": "c5",
          "text": "I would verify this by …",
          "meaning": "Tôi sẽ kiểm chứng bằng…",
          "use": "Đưa bằng chứng thay vì khẳng định suông",
          "pattern": "I would verify this by + V-ing",
          "simple": "I would verify this by running a test.",
          "example": "I would verify this by testing isolation and failure cases."
        }
      ],
      "terms": [
        {
          "term": "multi-tenancy",
          "meaning": "Nhiều khách hàng/tổ chức cùng dùng hệ thống",
          "usage": "design a multi-tenant service",
          "pitfall": "Tenant không luôn là một user; thường là tổ chức/khách hàng."
        },
        {
          "term": "SLO (service level objective)",
          "meaning": "Mục tiêu mức dịch vụ",
          "usage": "define a latency SLO",
          "pitfall": "Khác SLA là thỏa thuận; không tự hứa 100% uptime."
        },
        {
          "term": "capacity planning",
          "meaning": "Lập kế hoạch năng lực hệ thống",
          "usage": "plan capacity for peak traffic",
          "pitfall": "Dùng giả định và phép đo; tránh đoán một con số không căn cứ."
        },
        {
          "term": "graceful degradation",
          "meaning": "Giảm chức năng có kiểm soát khi lỗi/quá tải",
          "usage": "degrade gracefully",
          "pitfall": "Fallback vẫn phải giữ quyền truy cập và trung thực về giới hạn."
        },
        {
          "term": "rollout",
          "meaning": "Quá trình đưa thay đổi đến người dùng",
          "usage": "a gradual rollout",
          "pitfall": "Danh từ rollout; động từ roll out, rollback khác roll back."
        }
      ],
      "checks": [
        {
          "question": "What must be clarified before design?",
          "model": "Traffic, data boundaries, and response-time requirements."
        },
        {
          "question": "Why keep tools read-only initially?",
          "model": "To limit side effects while collecting evaluation and operational evidence."
        },
        {
          "question": "Name three tests in the proposed plan.",
          "model": "Tenant isolation, unsupported questions, slow clients, or duplicate tool calls."
        }
      ],
      "followups": [
        "1. Clarify requirements and estimate traffic using explicit assumptions.",
        "2. Walk through the Node.js request path and where authorization happens.",
        "3. A slow client and a slow model appear together. What changes?",
        "4. A tool call is delivered twice. How do you prevent duplicate effects?",
        "5. Retrieval returns no useful evidence. What does the user see?",
        "6. Defend your rollout criteria and explain one trade-off you would revisit."
      ],
      "quiz": [
        {
          "question": "An interviewer provides no traffic numbers. What should you do?",
          "options": [
            "State assumptions and ask about load before sizing.",
            "Claim your design supports unlimited traffic."
          ],
          "answer": 0,
          "explanation": "Make capacity assumptions explicit and validate them later."
        },
        {
          "question": "A fallback bypasses tenant filters to improve answer rate. Is that acceptable?",
          "options": [
            "Yes, if users get more answers.",
            "No; fallback must preserve access boundaries."
          ],
          "answer": 1,
          "explanation": "Degradation cannot remove the authorization boundary."
        }
      ],
      "sources": [
        [
          "Node.js · Event loop",
          "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
        ],
        [
          "Microsoft · RAG overview",
          "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"
        ]
      ]
    },
    {
      "id": "introduce-yourself",
      "title": "Giới thiệu bản thân · Tell me about yourself",
      "stage": 4,
      "mission": "Giới thiệu trong 60–90 giây: vai trò → đóng góp nổi bật → cách cộng tác → lý do ứng tuyển; dùng ít nhất 3 chunk.",
      "input": "Interviewer: Tell me about yourself and why you are interested in this role.\nCandidate: I am a backend developer with experience in building business applications. In my current role, I work on APIs and help the team plan releases. I mainly focus on reliable services and clear communication. One example is an order management project for a small retail business. My contribution was building the order API and working with QA on failure cases. I also helped a new teammate understand the code and supported sales with a short product demo. I enjoy turning unclear requests into small, testable tasks. I am looking for a role where I can take more responsibility for technical decisions while staying close to delivery. This position interests me because the team works directly with product and customers. I would like to learn more about how your backend team shares ownership.",
      "chunks": [
        {
          "id": "experience-1",
          "text": "I am a … with experience in …",
          "meaning": "Tôi là… có kinh nghiệm về…",
          "use": "Mở đầu gắn vai trò với năng lực liên quan",
          "pattern": "I am a + role + with experience in + V-ing / noun",
          "simple": "I am a developer with experience in testing.",
          "example": "I am a backend developer with experience in building order APIs."
        },
        {
          "id": "experience-2",
          "text": "In my current role, I …",
          "meaning": "Ở vai trò hiện tại, tôi…",
          "use": "Tóm tắt công việc hiện tại",
          "pattern": "In my current role, I + verb",
          "simple": "In my current role, I review code.",
          "example": "In my current role, I build APIs and support releases."
        },
        {
          "id": "experience-3",
          "text": "I mainly focus on …",
          "meaning": "Tôi tập trung chủ yếu vào…",
          "use": "Chọn một thế mạnh thay vì liệt kê công nghệ",
          "pattern": "I mainly focus on + noun / V-ing",
          "simple": "I mainly focus on testing.",
          "example": "I mainly focus on reliable services and clear communication."
        },
        {
          "id": "experience-4",
          "text": "My contribution was …",
          "meaning": "Đóng góp của tôi là…",
          "use": "Tách phần cá nhân khỏi kết quả cả nhóm",
          "pattern": "My contribution was + V-ing / noun",
          "simple": "My contribution was writing the tests.",
          "example": "My contribution was building the order API and checking failure cases."
        },
        {
          "id": "experience-5",
          "text": "I am looking for a role where I can …",
          "meaning": "Tôi tìm vai trò mà tôi có thể…",
          "use": "Nối kinh nghiệm với vị trí ứng tuyển",
          "pattern": "I am looking for a role where I can + verb",
          "simple": "I am looking for a role where I can learn.",
          "example": "I am looking for a role where I can guide technical decisions."
        }
      ],
      "terms": [
        {
          "term": "background",
          "meaning": "Nền tảng kinh nghiệm",
          "usage": "my engineering background",
          "pitfall": "Không kể toàn bộ tiểu sử."
        },
        {
          "term": "responsibility",
          "meaning": "Trách nhiệm",
          "usage": "take responsibility for delivery",
          "pitfall": "Responsibility là phần chịu trách nhiệm; achievement là thành quả."
        },
        {
          "term": "contribution",
          "meaning": "Đóng góp cụ thể",
          "usage": "my contribution to the project",
          "pitfall": "Dùng I cho việc cá nhân, we cho việc nhóm."
        },
        {
          "term": "strength",
          "meaning": "Điểm mạnh",
          "usage": "a strength supported by an example",
          "pitfall": "Không chỉ nói hard-working mà thiếu minh chứng."
        },
        {
          "term": "role fit",
          "meaning": "Mức phù hợp với vai trò",
          "usage": "explain my fit for the role",
          "pitfall": "Gắn với mô tả công việc đã đọc, không đoán về công ty."
        }
      ],
      "checks": [
        {
          "question": "What does the candidate do in the current role?",
          "model": "They work on APIs and help plan releases."
        },
        {
          "question": "What was their personal contribution to the order project?",
          "model": "They built the order API and worked with QA on failure cases."
        },
        {
          "question": "Why does this role interest them?",
          "model": "They want more technical responsibility and direct work with product and customers."
        }
      ],
      "followups": [
        "Which part of that project did you personally own?",
        "What is one strength your teammates would mention? Give an example.",
        "You mentioned sales support. What did you actually prepare?",
        "Why are you considering a new role now?",
        "What would you need to learn in this position?",
        "Can you give me a shorter, 30-second version of your introduction?"
      ],
      "quiz": [
        {
          "question": "Which opening helps the interviewer understand your fit?",
          "options": [
            "A complete list of every tool you have used.",
            "Your role, relevant focus, and one example."
          ],
          "answer": 1,
          "explanation": "A focused introduction gives the interviewer clear areas to explore."
        },
        {
          "question": "You helped with one API in a team project. What is accurate?",
          "options": [
            "I built the whole platform myself.",
            "My contribution was building the order API."
          ],
          "answer": 1,
          "explanation": "Describe your own contribution without taking credit for the whole team."
        }
      ],
      "sources": [],
      "preparation": [
        "Ghi vai trò hiện tại, số năm nếu nhớ chính xác, 2 trách nhiệm và 1 dự án liên quan JD.",
        "Chọn 1 thế mạnh có việc thật chứng minh; ghi rõ phần mình làm và phần đồng đội.",
        "Chuẩn bị lý do chuyển việc trung tính và 1 câu hỏi về team. Nếu chưa có kinh nghiệm thương mại, nói rõ personal project."
      ],
      "speakingGuide": [
        "0–15 giây: vai trò và mảng công việc.",
        "15–45 giây: một dự án + phần bạn làm + kết quả có căn cứ.",
        "45–70 giây: hỗ trợ team hoặc khách hàng bằng một ví dụ.",
        "70–90 giây: mong muốn ở vai trò mới và điểm liên quan JD."
      ],
      "pitfalls": [
        "Không học thuộc thông tin giả trong ví dụ. Thay bằng sự thật của bạn.",
        "Tránh mở đầu dài về tuổi/quê quán khi câu hỏi đang tập trung vào công việc.",
        "Không tự gọi mình expert ở mọi công nghệ; chọn 1–2 điểm có thể trả lời sâu."
      ],
      "shadowing": "In my current role, / I work on APIs / and help the team plan releases. / My contribution was building the order API.",
      "rubric": [
        "Người nghe biết vai trò của tôi trong 15 giây đầu.",
        "Tôi nêu một đóng góp cá nhân có ví dụ.",
        "Tôi giải thích được vì sao muốn vai trò này mà không nói xấu công ty cũ."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "project-deep-dive",
      "title": "Kể dự án đã làm · Project deep dive",
      "stage": 4,
      "mission": "Kể một dự án thật trong 2 phút, rồi bảo vệ phạm vi cá nhân, quyết định và kết quả qua 6 câu hỏi sâu.",
      "input": "Interviewer: Walk me through a project you are proud of.\nCandidate: The goal was to help store staff manage orders in one place. Before the project, they copied information between spreadsheets and often missed updates. Our team had four people, and we had eight weeks for the first release. I was responsible for the order API and the import flow. We chose a simple scheduled import because the client did not need live updates yet. The main constraint was the delivery date, so we kept advanced reports out of the first release. I discussed that scope with the product owner and wrote down the trade-off. We tested the import with sample files and asked two staff members to try the workflow. As a result, they could complete the agreed order flow in acceptance testing. We did not measure time savings after launch. If I did it again, I would agree on those measurements before development started.",
      "chunks": [
        {
          "id": "experience-6",
          "text": "The goal was to …",
          "meaning": "Mục tiêu là…",
          "use": "Bắt đầu bằng nhu cầu người dùng",
          "pattern": "The goal was to + verb",
          "simple": "The goal was to reduce errors.",
          "example": "The goal was to help staff manage orders in one place."
        },
        {
          "id": "experience-7",
          "text": "I was responsible for …",
          "meaning": "Tôi phụ trách…",
          "use": "Giới hạn ownership cá nhân",
          "pattern": "I was responsible for + noun / V-ing",
          "simple": "I was responsible for testing.",
          "example": "I was responsible for the order API and the import flow."
        },
        {
          "id": "experience-8",
          "text": "The main constraint was …",
          "meaning": "Ràng buộc chính là…",
          "use": "Giải thích hoàn cảnh quyết định",
          "pattern": "The main constraint was + noun",
          "simple": "The main constraint was time.",
          "example": "The main constraint was the eight-week delivery date."
        },
        {
          "id": "experience-9",
          "text": "As a result, …",
          "meaning": "Kết quả là…",
          "use": "Nêu kết quả có bằng chứng",
          "pattern": "As a result, + clause",
          "simple": "As a result, the test passed.",
          "example": "As a result, staff completed the agreed flow in acceptance testing."
        },
        {
          "id": "experience-10",
          "text": "If I did it again, I would …",
          "meaning": "Nếu làm lại, tôi sẽ…",
          "use": "Phản tư cụ thể, không phủ nhận toàn bộ dự án",
          "pattern": "If I did it again, I would + verb",
          "simple": "If I did it again, I would test earlier.",
          "example": "If I did it again, I would agree on success measures before development."
        }
      ],
      "terms": [
        {
          "term": "scope",
          "meaning": "Phạm vi đã thống nhất",
          "usage": "agree on the release scope",
          "pitfall": "Không đồng nhất scope với mọi mong muốn của khách hàng."
        },
        {
          "term": "ownership",
          "meaning": "Phần chịu trách nhiệm đến cùng",
          "usage": "take ownership of the import flow",
          "pitfall": "Nêu giới hạn, người quyết định và người phối hợp."
        },
        {
          "term": "constraint",
          "meaning": "Ràng buộc",
          "usage": "work within a time constraint",
          "pitfall": "Phân biệt điều bắt buộc với sở thích công nghệ."
        },
        {
          "term": "acceptance criteria",
          "meaning": "Tiêu chí nghiệm thu",
          "usage": "define acceptance criteria",
          "pitfall": "Cần hành vi quan sát được, không chỉ easy to use."
        },
        {
          "term": "trade-off",
          "meaning": "Sự đánh đổi",
          "usage": "explain a design trade-off",
          "pitfall": "Nêu cả lợi ích và cái mất, không chỉ ưu điểm."
        }
      ],
      "checks": [
        {
          "question": "Why did the team choose a scheduled import?",
          "model": "The client did not need live updates yet."
        },
        {
          "question": "What did the candidate own?",
          "model": "The order API and the import flow."
        },
        {
          "question": "What outcome was verified, and what was not measured?",
          "model": "Staff completed the agreed flow in acceptance testing; time savings after launch were not measured."
        }
      ],
      "followups": [
        "Who used the system, and what did their workflow look like before?",
        "Draw the request or data flow in words. Where did your work start and end?",
        "Which alternative did you reject, and why was it less suitable?",
        "What did you cut from the release? Who agreed to that?",
        "How do you know the result improved the user experience?",
        "What would you change if the client needed updates immediately?"
      ],
      "quiz": [
        {
          "question": "You have acceptance-test results but no production metrics. What can you say?",
          "options": [
            "We proved a 50% productivity increase.",
            "Staff completed the agreed flow in acceptance testing."
          ],
          "answer": 1,
          "explanation": "Report the evidence you actually have and state what was not measured."
        },
        {
          "question": "What makes a design explanation stronger?",
          "options": [
            "Connect the choice to a constraint and name the trade-off.",
            "List many framework names."
          ],
          "answer": 0,
          "explanation": "The interviewer needs to understand why the choice suited this project."
        }
      ],
      "sources": [],
      "preparation": [
        "Điền thẻ dự án: người dùng → vấn đề → team/thời gian → phạm vi cá nhân → 2 lựa chọn → kết quả.",
        "Chuẩn bị đường đi dữ liệu bằng lời: user → API → xử lý → lưu trữ → phản hồi; chỉ dùng chi tiết bạn hiểu.",
        "Ghi bằng chứng có thật: nghiệm thu, lỗi trước/sau, phản hồi, số đo nếu có; ghi rõ phần chưa đo."
      ],
      "speakingGuide": [
        "20 giây: bối cảnh và mục tiêu nghiệp vụ.",
        "30 giây: phạm vi của team và phần riêng của bạn.",
        "40 giây: lựa chọn, phương án bị loại và ràng buộc.",
        "30 giây: kết quả có căn cứ và điều sẽ làm khác."
      ],
      "pitfalls": [
        "Đừng dành cả 2 phút đọc tech stack.",
        "Nếu nói we built…, nối ngay I was responsible for… để làm rõ đóng góp.",
        "Phân biệt prototype, dự án đã launch và dự án dừng giữa chừng."
      ],
      "shadowing": "The goal was to help store staff / manage orders in one place. / I was responsible for the order API / and the import flow.",
      "rubric": [
        "Có mục tiêu nghiệp vụ rõ.",
        "Có lựa chọn và trade-off cụ thể.",
        "Phân biệt kết quả quan sát được và tác động chưa đo."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "issue-resolution",
      "title": "Kể issue khó · Investigation, fix & prevention",
      "stage": 4,
      "mission": "Kể một vấn đề trong 2 phút theo bối cảnh → điều tra → xử lý → kiểm chứng → phòng ngừa, phân biệt giả thuyết và nguyên nhân đã xác nhận.",
      "input": "Interviewer: Tell me about a difficult production issue you solved.\nCandidate: We noticed that some customers received two confirmation emails for one order. The order itself was not duplicated, but support received confused messages. My first step was to compare the order records with the email job logs. At first, I thought the checkout page sent two requests. The logs did not support that idea. After checking the retry path, I found that the email job could run again after a timeout. I worked with a teammate to stop the affected retry path while we prepared a safer fix. I added a check using the order ID before sending another confirmation. We verified the fix by replaying the timeout case in staging and watching the release with support. To prevent this from happening again, we added a regression test and documented the retry behavior. I learned to separate the customer impact from my first technical guess.",
      "chunks": [
        {
          "id": "experience-11",
          "text": "We noticed that …",
          "meaning": "Chúng tôi nhận thấy…",
          "use": "Nêu triệu chứng quan sát được",
          "pattern": "We noticed that + clause",
          "simple": "We noticed that the test failed.",
          "example": "We noticed that customers received two confirmation emails."
        },
        {
          "id": "experience-12",
          "text": "My first step was to …",
          "meaning": "Bước đầu tiên của tôi là…",
          "use": "Kể việc điều tra đã làm",
          "pattern": "My first step was to + verb",
          "simple": "My first step was to read the logs.",
          "example": "My first step was to compare order records with email job logs."
        },
        {
          "id": "experience-13",
          "text": "At first, I thought …",
          "meaning": "Ban đầu, tôi nghĩ…",
          "use": "Nêu giả thuyết ban đầu, có thể sai",
          "pattern": "At first, I thought + clause",
          "simple": "At first, I thought the file was empty.",
          "example": "At first, I thought the checkout page sent two requests."
        },
        {
          "id": "experience-14",
          "text": "We verified the fix by …",
          "meaning": "Chúng tôi kiểm chứng bản sửa bằng…",
          "use": "Nêu cách test và theo dõi thực tế",
          "pattern": "We verified the fix by + V-ing",
          "simple": "We verified the fix by repeating the test.",
          "example": "We verified the fix by replaying the timeout case in staging."
        },
        {
          "id": "experience-15",
          "text": "To prevent this from happening again, we …",
          "meaning": "Để tránh tái diễn, chúng tôi…",
          "use": "Kết thúc bằng thay đổi phòng ngừa",
          "pattern": "To prevent this from happening again, we + past verb",
          "simple": "To prevent this from happening again, we added a test.",
          "example": "To prevent this from happening again, we tested the retry path."
        }
      ],
      "terms": [
        {
          "term": "symptom",
          "meaning": "Triệu chứng quan sát được",
          "usage": "describe the symptom",
          "pitfall": "Triệu chứng chưa phải nguyên nhân."
        },
        {
          "term": "root cause",
          "meaning": "Nguyên nhân gốc",
          "usage": "confirm the root cause",
          "pitfall": "Không gọi một phỏng đoán là nguyên nhân đã xác nhận."
        },
        {
          "term": "mitigation",
          "meaning": "Biện pháp giảm ảnh hưởng tạm thời",
          "usage": "apply a temporary mitigation",
          "pitfall": "Giảm tác động khác sửa tận gốc."
        },
        {
          "term": "regression test",
          "meaning": "Test ngăn lỗi cũ quay lại",
          "usage": "add a regression test",
          "pitfall": "Nêu tình huống test, không chỉ nói add more tests."
        },
        {
          "term": "rollback",
          "meaning": "Quay về bản trước",
          "usage": "prepare a rollback plan",
          "pitfall": "Kể điều đã làm; nếu chưa rollback, nói đó là phương án dự phòng."
        }
      ],
      "checks": [
        {
          "question": "What was the customer impact?",
          "model": "Customers received duplicate emails and contacted support; orders were not duplicated."
        },
        {
          "question": "Which first guess was not supported by the logs?",
          "model": "The guess that checkout sent two requests."
        },
        {
          "question": "How did the team verify the fix?",
          "model": "They replayed the timeout case in staging and watched the release with support."
        }
      ],
      "followups": [
        "How did you determine the impact and urgency?",
        "What evidence ruled out your first hypothesis?",
        "What did you do personally, and who helped you?",
        "Why was your temporary mitigation acceptable? What did it affect?",
        "What failure case did you add to the regression test?",
        "What would you do if the same symptom returned after release?"
      ],
      "quiz": [
        {
          "question": "Logs contradict your first guess. What should your story show?",
          "options": [
            "I kept my original conclusion.",
            "I changed my hypothesis based on the evidence."
          ],
          "answer": 1,
          "explanation": "A strong investigation updates the explanation when evidence changes."
        },
        {
          "question": "Which statement separates mitigation from prevention?",
          "options": [
            "We paused affected retries, then added a fix and a regression test.",
            "We told support the issue was impossible."
          ],
          "answer": 0,
          "explanation": "Explain the immediate action and the later work that reduces recurrence."
        }
      ],
      "sources": [],
      "preparation": [
        "Chọn 1 issue thật; ghi triệu chứng, người bị ảnh hưởng và cách biết mức độ.",
        "Viết timeline 4 mốc: phát hiện → giả thuyết/test → giảm tác động → fix và kiểm chứng.",
        "Ghi rõ điều chưa biết. Ví dụ là một câu chuyện giản lược, không phải thiết kế bảo đảm gửi email đúng một lần trong mọi hệ thống."
      ],
      "speakingGuide": [
        "20 giây: triệu chứng và ảnh hưởng nghiệp vụ.",
        "45 giây: hai giả thuyết, bằng chứng và việc bạn thực hiện.",
        "35 giây: giảm tác động, fix, test và theo dõi sau release.",
        "20 giây: bài học và phòng ngừa."
      ],
      "pitfalls": [
        "Không đổ lỗi cho member hay nói I fixed everything mà không giải thích.",
        "Đừng nói fixed khi mới triển khai mà chưa kiểm chứng.",
        "Nếu chưa xử lý production incident, kể bug ở staging và nói rõ môi trường."
      ],
      "shadowing": "At first, / I thought the checkout page sent two requests. / The logs did not support that idea. / My first step was to compare the records.",
      "rubric": [
        "Có bằng chứng để thay đổi hoặc xác nhận giả thuyết.",
        "Tách giảm tác động khỏi sửa tận gốc.",
        "Nêu kiểm chứng và một hành động phòng ngừa."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "support-teammates",
      "title": "Hỗ trợ member · Coaching without taking over",
      "stage": 5,
      "mission": "Kể trong 90–120 giây cách giúp một member vượt blocker nhưng vẫn tự làm được việc; xử lý bất đồng và áp lực deadline.",
      "input": "Interviewer: Tell me about a time you helped a teammate who was struggling.\nCandidate: A new teammate was working on an import feature and had trouble with validation errors. I asked them to show me one failing example and explain what they had already tried. Instead of taking over, I suggested a short pairing session. We traced one row through the code and found that the validation message did not identify the field. I helped them break the task into smaller steps: reproduce the failure, improve the message, and add a test. They wrote the change, and I reviewed it with them. We agreed on a checkpoint the next afternoon because the release was close. I also told our lead what support was needed. By the next review, the teammate could explain the failure and handle a similar case independently. I learned that useful support should make the next task easier for the other person, not just finish today's ticket.",
      "chunks": [
        {
          "id": "experience-16",
          "text": "I asked them to …",
          "meaning": "Tôi đề nghị bạn ấy…",
          "use": "Tìm hiểu trước khi đưa giải pháp",
          "pattern": "I asked them to + verb",
          "simple": "I asked them to explain the error.",
          "example": "I asked them to show one failing example."
        },
        {
          "id": "experience-17",
          "text": "Instead of taking over, I …",
          "meaning": "Thay vì làm thay, tôi…",
          "use": "Nêu cách hỗ trợ mà vẫn giữ ownership",
          "pattern": "Instead of taking over, I + past verb",
          "simple": "Instead of taking over, I asked a question.",
          "example": "Instead of taking over, I suggested a short pairing session."
        },
        {
          "id": "experience-18",
          "text": "I helped them break … into …",
          "meaning": "Tôi giúp bạn ấy chia… thành…",
          "use": "Chia nhỏ blocker thành hành động",
          "pattern": "I helped them break + task + into + steps",
          "simple": "I helped them break the work into two steps.",
          "example": "I helped them break the import fix into smaller steps."
        },
        {
          "id": "experience-19",
          "text": "We agreed on …",
          "meaning": "Chúng tôi thống nhất…",
          "use": "Nêu checkpoint hay trách nhiệm chung",
          "pattern": "We agreed on + noun",
          "simple": "We agreed on a time.",
          "example": "We agreed on a checkpoint the next afternoon."
        },
        {
          "id": "experience-20",
          "text": "By the next review, …",
          "meaning": "Đến lần review tiếp theo,…",
          "use": "Cho thấy khả năng tự làm sau hỗ trợ",
          "pattern": "By the next review, + clause",
          "simple": "By the next review, the test passed.",
          "example": "By the next review, they could explain the failure independently."
        }
      ],
      "terms": [
        {
          "term": "blocker",
          "meaning": "Vướng mắc ngăn tiến triển",
          "usage": "remove a blocker",
          "pitfall": "Hỏi đã thử gì trước khi kết luận thiếu năng lực."
        },
        {
          "term": "pairing",
          "meaning": "Cùng làm để hiểu và xử lý",
          "usage": "a short pairing session",
          "pitfall": "Không phải một người làm hết, người kia chỉ nhìn."
        },
        {
          "term": "constructive feedback",
          "meaning": "Góp ý giúp cải thiện",
          "usage": "give constructive feedback",
          "pitfall": "Góp ý hành vi/code và bước cải thiện, không công kích cá nhân."
        },
        {
          "term": "checkpoint",
          "meaning": "Mốc kiểm tra tiến độ",
          "usage": "agree on a checkpoint",
          "pitfall": "Cần thời điểm và kết quả mong đợi."
        },
        {
          "term": "escalation",
          "meaning": "Nhờ cấp phù hợp hỗ trợ quyết định",
          "usage": "escalate a delivery risk",
          "pitfall": "Nêu rủi ro và đề xuất, không chỉ kể lỗi của người khác."
        }
      ],
      "checks": [
        {
          "question": "What did the candidate ask before giving advice?",
          "model": "They asked for a failing example and what the teammate had already tried."
        },
        {
          "question": "Who wrote the change?",
          "model": "The teammate wrote it; the candidate reviewed it with them."
        },
        {
          "question": "What evidence suggests the support helped?",
          "model": "The teammate could explain the failure and handle a similar case independently."
        }
      ],
      "followups": [
        "How did you find out whether the blocker was technical or an unclear requirement?",
        "What if the teammate disagreed with your review comment?",
        "What would you do if the deadline was tomorrow?",
        "How did you make sure they still owned the task?",
        "When would you involve the team lead?",
        "How did you check that your support helped beyond that one ticket?"
      ],
      "quiz": [
        {
          "question": "Which feedback is actionable?",
          "options": [
            "You are careless.",
            "This error message misses the field name. Can we add it and test the case?"
          ],
          "answer": 1,
          "explanation": "Specific feedback identifies the problem and a practical next step."
        },
        {
          "question": "Which result best shows learning?",
          "options": [
            "I rewrote everything myself.",
            "They handled a similar case independently."
          ],
          "answer": 1,
          "explanation": "Independence is evidence that the support transferred understanding."
        }
      ],
      "sources": [],
      "preparation": [
        "Chọn tình huống có blocker cụ thể, tránh tên thật nếu không cần.",
        "Ghi câu hỏi bạn đã dùng, cách chia việc, người viết code và cách follow-up.",
        "Chuẩn bị nhánh khó: member bất đồng, vẫn mắc sau hỗ trợ, hoặc deadline gấp."
      ],
      "speakingGuide": [
        "20 giây: blocker và ảnh hưởng đến team.",
        "40 giây: cách lắng nghe, cùng điều tra và hỗ trợ.",
        "30 giây: ownership, checkpoint và phối hợp lead.",
        "20 giây: dấu hiệu member tự làm tốt hơn."
      ],
      "pitfalls": [
        "Không mô tả member là weak/lazy; nói rõ khó khăn quan sát được.",
        "Không biến hỗ trợ thành câu chuyện mình là người hùng.",
        "Nếu cần tự xử lý vì khẩn cấp, nói rõ lý do và buổi bàn giao/học lại sau đó."
      ],
      "shadowing": "Instead of taking over, / I suggested a short pairing session. / We agreed on a checkpoint / the next afternoon.",
      "rubric": [
        "Có lắng nghe trước khi hướng dẫn.",
        "Member vẫn có phần việc tự chịu trách nhiệm.",
        "Có kết quả quan sát được và cách theo dõi."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "sales-proposal",
      "title": "Hỗ trợ sales · Discovery, estimate & proposal",
      "stage": 5,
      "mission": "Kể trong 2 phút cách biến yêu cầu chưa rõ thành proposal: làm rõ mục tiêu, phạm vi, giả định, estimate và rủi ro.",
      "input": "Interviewer: Have you supported sales before a project was signed?\nCandidate: Yes. A potential client wanted a reporting dashboard and asked for a fixed delivery date. I worked with sales to clarify the business goal before suggesting a solution. The client needed a weekly view of orders, not a live analytics platform. To clarify the scope, I asked which reports were essential and who would approve them. Based on the information available, I proposed a small first phase with one data source and three reports. This estimate assumed that the client would provide sample data and access in the first week. The main risk was poor data quality, so I recommended a discovery task before confirming the final effort. I documented the exclusions and reviewed the proposal with our delivery lead. Before committing to a date, we agreed to validate the import with a sample file. Sales used the revised scope in the next client meeting; I did not own the commercial negotiation.",
      "chunks": [
        {
          "id": "experience-21",
          "text": "I worked with sales to …",
          "meaning": "Tôi phối hợp sales để…",
          "use": "Làm rõ vai trò hỗ trợ presales",
          "pattern": "I worked with sales to + verb",
          "simple": "I worked with sales to prepare a demo.",
          "example": "I worked with sales to clarify the business goal."
        },
        {
          "id": "experience-22",
          "text": "To clarify the scope, I asked …",
          "meaning": "Để làm rõ phạm vi, tôi hỏi…",
          "use": "Kể câu hỏi discovery thực tế",
          "pattern": "To clarify the scope, I asked + question clause",
          "simple": "To clarify the scope, I asked who would use it.",
          "example": "To clarify the scope, I asked which reports were essential."
        },
        {
          "id": "experience-23",
          "text": "Based on the information available, …",
          "meaning": "Dựa trên thông tin hiện có,…",
          "use": "Đặt giới hạn cho đề xuất ban đầu",
          "pattern": "Based on the information available, + clause",
          "simple": "Based on the information available, we need another meeting.",
          "example": "Based on the information available, I proposed a small first phase."
        },
        {
          "id": "experience-24",
          "text": "This estimate assumed that …",
          "meaning": "Ước lượng này giả định rằng…",
          "use": "Nêu dependency ảnh hưởng estimate",
          "pattern": "This estimate assumed that + clause",
          "simple": "This estimate assumed that the data was ready.",
          "example": "This estimate assumed that the client would provide access in week one."
        },
        {
          "id": "experience-25",
          "text": "Before committing to …, we …",
          "meaning": "Trước khi cam kết…, chúng tôi…",
          "use": "Nêu bước xác minh trước lời hứa",
          "pattern": "Before committing to + noun / V-ing, we + past verb",
          "simple": "Before committing to a date, we checked the scope.",
          "example": "Before committing to a date, we validated the import with sample data."
        }
      ],
      "terms": [
        {
          "term": "discovery",
          "meaning": "Giai đoạn tìm hiểu nhu cầu",
          "usage": "run a discovery session",
          "pitfall": "Hỏi mục tiêu và workflow trước khi chốt giải pháp."
        },
        {
          "term": "proposal",
          "meaning": "Đề xuất giải pháp/phạm vi triển khai",
          "usage": "prepare a technical proposal",
          "pitfall": "Không chỉ là báo giá; cần phạm vi, giả định và cách nghiệm thu."
        },
        {
          "term": "estimate",
          "meaning": "Ước lượng",
          "usage": "provide an effort estimate",
          "pitfall": "Estimate không phải lời bảo đảm khi giả định chưa được kiểm chứng."
        },
        {
          "term": "assumption",
          "meaning": "Giả định",
          "usage": "document an assumption",
          "pitfall": "Nêu ai xác nhận và nếu sai thì ảnh hưởng gì."
        },
        {
          "term": "exclusion",
          "meaning": "Phần nằm ngoài phạm vi",
          "usage": "list scope exclusions",
          "pitfall": "Nói rõ để khách hàng không hiểu demo bao gồm mọi thứ."
        }
      ],
      "checks": [
        {
          "question": "What did the client actually need?",
          "model": "A weekly view of orders, rather than live analytics."
        },
        {
          "question": "What did the estimate depend on?",
          "model": "Sample data and access being available in the first week."
        },
        {
          "question": "What was the candidate responsible for, and what did they not own?",
          "model": "They clarified technical scope and reviewed the proposal; they did not own commercial negotiation."
        }
      ],
      "followups": [
        "What discovery questions did you ask the client directly?",
        "How did you turn those answers into deliverables and acceptance criteria?",
        "How did you estimate work when the data quality was unknown?",
        "What did you include and exclude in the first phase?",
        "What if sales promised an earlier date without asking engineering?",
        "Did the client sign? What evidence do you have about your contribution?"
      ],
      "quiz": [
        {
          "question": "The client has not provided sample data. Which estimate is clearer?",
          "options": [
            "It will definitely take ten days.",
            "The estimate assumes usable sample data; we need to validate that first."
          ],
          "answer": 1,
          "explanation": "Make the dependency explicit before turning an estimate into a commitment."
        },
        {
          "question": "Sales asks for a shorter timeline. What helps?",
          "options": [
            "Offer a smaller first phase and review risks with delivery.",
            "Promise the original scope in half the time."
          ],
          "answer": 0,
          "explanation": "Discuss scope, capacity and uncertainty together with the people delivering the work."
        }
      ],
      "sources": [],
      "preparation": [
        "Chuẩn bị mini proposal bằng 6 gạch đầu dòng: mục tiêu, deliverables, ngoài phạm vi, giả định, effort/rủi ro, nghiệm thu.",
        "Ghi 3 câu discovery: ai dùng, quyết định nào cần hỗ trợ, hiện làm bằng cách nào.",
        "Nếu chưa làm presales, dùng bài mô phỏng và nói I would…; không kể như hợp đồng đã thắng."
      ],
      "speakingGuide": [
        "20 giây: yêu cầu ban đầu và vai trò sales/engineering.",
        "35 giây: câu hỏi discovery và nhu cầu thật.",
        "45 giây: phạm vi đề xuất, estimate, giả định và rủi ro.",
        "20 giây: bước xác nhận và kết quả thương mại thật sự biết."
      ],
      "pitfalls": [
        "Không nhận công thắng dự án chỉ vì đã làm proposal; nêu phần bạn đóng góp.",
        "Phân biệt effort (person-days) và thời gian lịch (calendar weeks).",
        "Không hứa tính năng hay deadline chưa được delivery team xác nhận."
      ],
      "shadowing": "Based on the information available, / I proposed a small first phase. / This estimate assumed that / the client would provide sample data.",
      "rubric": [
        "Có ít nhất 2 câu hỏi discovery cụ thể.",
        "Đề xuất nêu cả deliverables, exclusions và assumptions.",
        "Kết quả thương mại không vượt quá bằng chứng mình biết."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "client-demo",
      "title": "Demo cho khách hàng · Value, objections & handoff",
      "stage": 5,
      "mission": "Kể một demo presales trong 2 phút, rồi xử lý câu hỏi về tính năng chưa có, dữ liệu thật, lỗi demo và bước tiếp theo.",
      "input": "Interviewer: Tell me about a demo you prepared to help win a project.\nCandidate: A client wanted to see whether our proposed dashboard could help a store manager review delayed orders. The purpose of the demo was to test that workflow, not show every possible feature. I built a small prototype with sample data and rehearsed the story with sales. Let me walk you through the flow: the manager opens the list, filters delayed orders, and checks the reason for one delay. What this shows is how the proposed screen could support a daily review. This version did not include live data or access control. When the client asked about those features, I explained the limit and noted them for the proposal. I had screenshots ready in case the demo failed. The client asked for a follow-up workshop with their operations team. The next step was to confirm the workflow and update the scope. That was a useful signal of interest, but it was not a signed contract.",
      "chunks": [
        {
          "id": "experience-26",
          "text": "The purpose of the demo was to …",
          "meaning": "Mục đích demo là…",
          "use": "Nối demo với câu hỏi nghiệp vụ",
          "pattern": "The purpose of the demo was to + verb",
          "simple": "The purpose of the demo was to get feedback.",
          "example": "The purpose of the demo was to test the delayed-order workflow."
        },
        {
          "id": "experience-27",
          "text": "Let me walk you through …",
          "meaning": "Để tôi trình bày từng bước…",
          "use": "Dẫn người xem qua một luồng",
          "pattern": "Let me walk you through + noun",
          "simple": "Let me walk you through the screen.",
          "example": "Let me walk you through the order review flow."
        },
        {
          "id": "experience-28",
          "text": "What this shows is …",
          "meaning": "Điều này cho thấy…",
          "use": "Giải thích giá trị của thao tác vừa demo",
          "pattern": "What this shows is + noun / clause",
          "simple": "What this shows is the current status.",
          "example": "What this shows is how a manager could review delayed orders."
        },
        {
          "id": "experience-29",
          "text": "This version does not include …",
          "meaning": "Phiên bản này chưa có…",
          "use": "Nói rõ giới hạn khi khách hỏi sâu",
          "pattern": "This version does not include + noun",
          "simple": "This version does not include exports.",
          "example": "This version does not include live data or access control."
        },
        {
          "id": "experience-30",
          "text": "The next step was to …",
          "meaning": "Bước tiếp theo là…",
          "use": "Kết thúc bằng follow-up cụ thể",
          "pattern": "The next step was to + verb",
          "simple": "The next step was to book a meeting.",
          "example": "The next step was to confirm the workflow with operations."
        }
      ],
      "terms": [
        {
          "term": "prototype",
          "meaning": "Bản mẫu để kiểm tra ý tưởng",
          "usage": "build a prototype",
          "pitfall": "Prototype không tự chứng minh hệ thống sẵn sàng production."
        },
        {
          "term": "sample data",
          "meaning": "Dữ liệu mẫu",
          "usage": "use clearly labelled sample data",
          "pitfall": "Nói rõ dữ liệu giả lập, không trình bày như dữ liệu live."
        },
        {
          "term": "objection",
          "meaning": "Băn khoăn hoặc phản đối của khách",
          "usage": "address a client objection",
          "pitfall": "Hỏi rõ nhu cầu đằng sau câu phản đối trước khi hứa thêm tính năng."
        },
        {
          "term": "fallback",
          "meaning": "Phương án dự phòng",
          "usage": "prepare a demo fallback",
          "pitfall": "Ảnh/video dự phòng phải được giới thiệu đúng là bản ghi."
        },
        {
          "term": "handoff",
          "meaning": "Bàn giao thông tin/trách nhiệm",
          "usage": "prepare a delivery handoff",
          "pitfall": "Chuyển cả giới hạn, cam kết và câu hỏi chưa chốt cho team delivery."
        }
      ],
      "checks": [
        {
          "question": "Which workflow did the demo test?",
          "model": "A store manager reviewing delayed orders."
        },
        {
          "question": "Which features were missing?",
          "model": "Live data and access control."
        },
        {
          "question": "What was the outcome, and what must not be claimed?",
          "model": "The client requested a workshop; the candidate must not claim a signed contract."
        }
      ],
      "followups": [
        "Why did you choose this workflow instead of showing all screens?",
        "How did you split preparation between you and sales?",
        "The client asks: Does this already work with our live data? Respond directly.",
        "The demo fails during the meeting. What do you say and do?",
        "The client says a competitor has more features. How do you respond?",
        "What did you hand over to delivery, and did the opportunity become a project?"
      ],
      "quiz": [
        {
          "question": "The demo uses sample data. A client asks if the integration is ready.",
          "options": [
            "Yes, everything is ready for production.",
            "This uses sample data; we still need to validate your integration."
          ],
          "answer": 1,
          "explanation": "State the demonstrated capability and the untested dependency separately."
        },
        {
          "question": "A follow-up workshop is booked. Which outcome is accurate?",
          "options": [
            "We won the contract.",
            "The client agreed to a workshop to confirm the workflow."
          ],
          "answer": 1,
          "explanation": "Interest and an agreed next step are different from a signed contract."
        }
      ],
      "sources": [],
      "preparation": [
        "Chọn một persona và một workflow 3 bước; ghi câu hỏi mà demo cần trả lời.",
        "Lập bảng nói được bằng lời: đã chạy thật / giả lập / chưa có / cần xác nhận.",
        "Chuẩn bị fallback, 2 câu objection và bàn giao gồm scope, feedback, việc còn mở, người phụ trách."
      ],
      "speakingGuide": [
        "20 giây: mục tiêu khách hàng và vai trò bạn.",
        "40 giây: luồng demo 3 bước và giá trị từng bước.",
        "40 giây: giới hạn, câu hỏi khó và cách xử lý.",
        "20 giây: follow-up, bàn giao và kết quả có bằng chứng."
      ],
      "pitfalls": [
        "Không nói demo ổn nghĩa là production đã sẵn sàng.",
        "Không né câu hỏi tính năng chưa có; nói giới hạn rồi cách xác minh.",
        "Nếu chưa biết deal có ký không, nói I was not involved in the final commercial decision."
      ],
      "shadowing": "Let me walk you through the flow. / This version does not include live data. / The next step was to confirm the workflow.",
      "rubric": [
        "Demo giải quyết một câu hỏi của người dùng.",
        "Nêu rõ dữ liệu và tính năng nào chỉ là mẫu.",
        "Kết thúc với bước tiếp theo và người phụ trách."
      ],
      "grammar": "Dùng quá khứ đơn cho việc đã làm (I built / checked / helped); dùng hiện tại cho vai trò hiện tại. I would + động từ chỉ cách làm giả định.",
      "duration": "35–40 phút"
    },
    {
      "id": "experience-mock-interview",
      "title": "Phỏng vấn thực tế · 60-minute experience interview",
      "stage": 5,
      "mission": "Mô phỏng 45 phút hỏi–đáp liên tục trong buổi 60 phút; dùng 5 chunk cũ, kể nhất quán đóng góp và bằng chứng qua các câu hỏi đào sâu.",
      "input": "Interviewer: Give me a brief introduction, then choose one project for us to explore.\nCandidate: In my current role, I build backend services and support delivery. I would like to discuss an order management project. I was responsible for the order API and import flow.\nInterviewer: What went wrong, and what did you personally do?\nCandidate: Some confirmation emails were duplicated. My first step was to compare order records with email job logs. I worked with a teammate on the fix and tested the timeout case.\nInterviewer: Did you also support the client proposal?\nCandidate: Yes. This estimate assumed that sample data would be available early. I helped sales explain that dependency. We later demonstrated the workflow with sample data.\nInterviewer: Did your demo win the contract?\nCandidate: I cannot claim that. The next step was to confirm the workflow in a workshop. Sales handled the commercial decision. My evidence is the technical scope and demo feedback, not the final contract.",
      "chunks": [
        {
          "id": "experience-2",
          "text": "In my current role, I …",
          "meaning": "Ở vai trò hiện tại, tôi…",
          "use": "Tóm tắt công việc hiện tại",
          "pattern": "In my current role, I + verb",
          "simple": "In my current role, I review code.",
          "example": "In my current role, I build APIs and support releases."
        },
        {
          "id": "experience-7",
          "text": "I was responsible for …",
          "meaning": "Tôi phụ trách…",
          "use": "Giới hạn ownership cá nhân",
          "pattern": "I was responsible for + noun / V-ing",
          "simple": "I was responsible for testing.",
          "example": "I was responsible for the order API and the import flow."
        },
        {
          "id": "experience-12",
          "text": "My first step was to …",
          "meaning": "Bước đầu tiên của tôi là…",
          "use": "Kể việc điều tra đã làm",
          "pattern": "My first step was to + verb",
          "simple": "My first step was to read the logs.",
          "example": "My first step was to compare order records with email job logs."
        },
        {
          "id": "experience-24",
          "text": "This estimate assumed that …",
          "meaning": "Ước lượng này giả định rằng…",
          "use": "Nêu dependency ảnh hưởng estimate",
          "pattern": "This estimate assumed that + clause",
          "simple": "This estimate assumed that the data was ready.",
          "example": "This estimate assumed that the client would provide access in week one."
        },
        {
          "id": "experience-30",
          "text": "The next step was to …",
          "meaning": "Bước tiếp theo là…",
          "use": "Kết thúc bằng follow-up cụ thể",
          "pattern": "The next step was to + verb",
          "simple": "The next step was to book a meeting.",
          "example": "The next step was to confirm the workflow with operations."
        }
      ],
      "terms": [
        {
          "term": "evidence",
          "meaning": "Bằng chứng cho điều mình kể",
          "usage": "support a claim with evidence",
          "pitfall": "Lần này ôn ý đã học: log, nghiệm thu, feedback; không cần bịa số."
        },
        {
          "term": "personal contribution",
          "meaning": "Đóng góp riêng của mình",
          "usage": "separate my contribution from team results",
          "pitfall": "Tái sử dụng contribution ở bài giới thiệu."
        },
        {
          "term": "assumption",
          "meaning": "Giả định",
          "usage": "validate an estimate assumption",
          "pitfall": "Ôn từ bài proposal; nói nếu giả định sai thì sao."
        },
        {
          "term": "trade-off",
          "meaning": "Sự đánh đổi",
          "usage": "explain the trade-off clearly",
          "pitfall": "Ôn từ bài dự án; phải nêu thứ phải hy sinh."
        },
        {
          "term": "handoff",
          "meaning": "Bàn giao",
          "usage": "document the delivery handoff",
          "pitfall": "Ôn từ bài demo; gồm cả những gì chưa được xác nhận."
        }
      ],
      "checks": [
        {
          "question": "What did the candidate personally own?",
          "model": "The order API and import flow."
        },
        {
          "question": "How did the candidate begin investigating the issue?",
          "model": "They compared order records with email job logs."
        },
        {
          "question": "Why did the candidate not claim to have won the contract?",
          "model": "Sales handled the commercial decision; their evidence only covered scope and demo feedback."
        }
      ],
      "followups": [
        "00–03 · Tell me about yourself. Why this role, and what relevant strength would you bring?",
        "03–11 · Walk me through one project: users, goal, team, your ownership, constraints and result. Probe: what exactly did YOU deliver?",
        "11–18 · Why did you choose that approach? Explain one rejected option. Probe: what would change with half the time or twice the scope?",
        "18–26 · Tell me about a difficult issue. Probe: what was your first hypothesis, what evidence changed it, and how did you verify the fix?",
        "26–32 · Tell me how you supported a teammate. Probe: what if they disagreed or the deadline was at risk? How did you know they improved?",
        "32–38 · Describe your role in a proposal. Probe: discovery questions, estimate assumptions, exclusions, and a promise sales made that you could not confirm.",
        "38–43 · Walk me through a client demo and one objection. Probe: what was simulated, what failed, what happened next, and was a contract signed?",
        "43–45 · What would you do differently? Ask the interviewer two questions about ownership, delivery or success in the first three months."
      ],
      "quiz": [
        {
          "question": "The interviewer challenges an unsupported result. What should you do?",
          "options": [
            "Clarify what was observed and what was not measured.",
            "Invent a number to sound confident."
          ],
          "answer": 0,
          "explanation": "Credibility comes from accurate boundaries, even when the result is modest."
        },
        {
          "question": "Your answer is becoming too long. What helps?",
          "options": [
            "Keep adding unrelated technical detail.",
            "State the decision and evidence, then offer to go deeper."
          ],
          "answer": 1,
          "explanation": "A concise answer leaves room for a real follow-up conversation."
        }
      ],
      "sources": [],
      "preparation": [
        "Trước buổi mock, học buổi 13–18. Chọn 1 dự án chính và 1 câu chuyện dự phòng; giữ cùng dữ kiện xuyên suốt.",
        "Chuẩn bị thẻ 4 từ khóa, đồng hồ và người hỏi nếu có. Tự luyện thì đọc từng câu hỏi, đóng tài liệu rồi nói; không có AI đóng vai trực tiếp.",
        "Tính 60 phút: Warm-up 3 + Input 5 + Recall 2 + phỏng vấn 45 + Review 5. Các mốc dưới đây tính từ lúc bắt đầu phần Speak. Đọc sâu chunk và sửa bài ở lượt luyện riêng."
      ],
      "speakingGuide": [
        "Phần Speak: bật đồng hồ riêng 45 phút, đi lần lượt 8 vòng có mốc thời gian.",
        "Mỗi lượt trả lời chính 60–120 giây, dành phần còn lại cho câu hỏi đào sâu hoặc phản biện.",
        "Người hỏi chỉ đưa một câu mỗi lần; lấy câu probe khi đáp án còn chung chung. Ghi lỗi và phản hồi sau 4–8 lượt.",
        "Nếu hết giờ, ghi rõ câu chưa làm; hoàn thành chúng ở lượt sau trước khi lưu buổi luyện."
      ],
      "pitfalls": [
        "Không ghép thành tích từ nhiều dự án thành một câu chuyện giả.",
        "Nếu không có trải nghiệm presales, nói rõ và xử lý câu hỏi dưới dạng giả định.",
        "Không đọc input mẫu trong 45 phút Speak; nói lại bằng dữ kiện của mình."
      ],
      "shadowing": "I was responsible for the order API. / My first step was to compare the records. / The next step was to confirm the workflow.",
      "rubric": [
        "Rõ ý: tôi trả lời đúng câu hỏi trong 60–120 giây mỗi lượt chính.",
        "Ownership: tôi phân biệt I và we, không mâu thuẫn giữa các vòng.",
        "Bằng chứng: có kết quả thật và thừa nhận chỗ chưa đo.",
        "Chiều sâu: có lựa chọn, rủi ro và phản biện.",
        "Giao tiếp: tôi hỏi làm rõ, xử lý follow-up và đặt 2 câu hỏi cho nhà tuyển dụng."
      ],
      "grammar": "Ôn các khung đã học: quá khứ đơn cho chuyện thật; I would cho giả định. Không thêm mẫu ngữ pháp mới trong buổi mock.",
      "duration": "60 phút · gồm 45 phút phỏng vấn",
      "phaseLabels": [
        "01 · Warm-up · 3′",
        "02 · Input · 5′",
        "03 · Recall · 2′",
        "04 · Interview · 45′",
        "05 · Review · 5′"
      ]
    }
  ]
};
