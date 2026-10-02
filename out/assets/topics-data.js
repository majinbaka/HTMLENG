// Original interview practice. Technical references reviewed 2026-10-02.
window.SpeakSprintTopicsData = {
  "id": "node-ai-interview",
  "category": "Chủ đề chuyên sâu",
  "title": "Senior Backend Interview · Node.js & AI",
  "description": "Diễn đạt kiến thức senior bằng tiếng Anh rõ ràng: giải thích cơ chế, bảo vệ quyết định, xử lý câu hỏi sâu và nói đúng thuật ngữ.",
  "stages": [
    "01 · Node.js runtime",
    "02 · System design & data",
    "03 · AI application engineering",
    "04 · Production & mock interview"
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
    }
  ]
};
