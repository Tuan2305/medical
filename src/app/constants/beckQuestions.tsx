import type { BeckQuestionGroup } from '../interface/forms';

export const beckQuestions: BeckQuestionGroup[] = [
  {
    id: 1,
    title: "Nỗi buồn",
    options: [
      { value: 0, text: "Tôi không cảm thấy buồn." },
      { value: 1, text: "Đôi lúc tôi cảm thấy buồn." },
      { value: 2, text: "Nhiều lúc tôi cảm thấy buồn." },
      { value: 3, text: "Lúc nào tôi cũng rất buồn hoặc rất bất hạnh đến mức không thể chịu được." },
    ],
  },
  {
    id: 2,
    title: "Bi quan về tương lai",
    options: [
      { value: 0, text: "Tôi không nản lòng về tương lai." },
      { value: 1, text: "Tôi cảm thấy nản lòng về tương lai hơn trước." },
      { value: 2, text: "Tôi cảm thấy mình chẳng mong đợi gì ở tương lai cả." },
      { value: 3, text: "Tôi cảm thấy tương lai tuyệt vọng và tình hình có thể xấu đi." },
    ],
  },
  {
    id: 3,
    title: "Cảm giác thất bại",
    options: [
      { value: 0, text: "Tôi không cảm thấy cuộc đời mình bị thất bại." },
      { value: 1, text: "Tôi thấy mình thất bại nhiều hơn những người khác." },
      { value: 2, text: "Nhìn lại cuộc đời, tôi thấy mình đã có quá nhiều thất bại." },
      { value: 3, text: "Tôi cảm thấy mình là một người hoàn toàn thất bại." },
    ],
  },
  {
    id: 4,
    title: "Mất hứng thú",
    options: [
      { value: 0, text: "Tôi còn thích thú với những điều mà trước đây tôi vẫn thường thích." },
      { value: 1, text: "Tôi thấy ít thích những điều mà trước đây tôi vẫn thường ưa thích." },
      { value: 2, text: "Tôi còn rất ít thích thú về những điều trước đây tôi vẫn thường thích." },
      { value: 3, text: "Tôi không còn chút thích thú nào nữa." },
    ],
  },
  {
    id: 5,
    title: "Cảm giác tội lỗi",
    options: [
      { value: 0, text: "Tôi hoàn toàn không cảm thấy có tội lỗi gì ghê gớm cả." },
      { value: 1, text: "Phần nhiều những việc tôi đã làm tôi đều cảm thấy có tội." },
      { value: 2, text: "Phần lớn thời gian tôi cảm thấy mình có tội." },
      { value: 3, text: "Lúc nào tôi cũng cảm thấy mình có tội." },
    ],
  },
  {
    id: 6,
    title: "Cảm giác bị trừng phạt",
    options: [
      { value: 0, text: "Tôi không cảm thấy mình đang bị trừng phạt." },
      { value: 1, text: "Tôi cảm thấy có lẽ mình đang bị trừng phạt." },
      { value: 2, text: "Tôi mong chờ bị trừng phạt." },
      { value: 3, text: "Tôi cảm thấy mình đang bị trừng phạt." },
    ],
  },
  {
    id: 7,
    title: "Mất lòng tin vào bản thân",
    options: [
      { value: 0, text: "Tôi vẫn còn tin tưởng vào bản thân mình." },
      { value: 1, text: "Tôi không còn tin tưởng vào bản thân mình." },
      { value: 2, text: "Tôi thất vọng với bản thân." },
      { value: 3, text: "Tôi ghét bản thân mình." },
    ],
  },
  {
    id: 8,
    title: "Tự phê phán bản thân",
    options: [
      { value: 0, text: "Tôi không phê phán hoặc đổ lỗi cho bản thân." },
      { value: 1, text: "Tôi phê phán bản thân mình nhiều hơn trước kia." },
      { value: 2, text: "Tôi phê phán bản thân về tất cả những lỗi lầm của mình." },
      { value: 3, text: "Tôi đổ lỗi cho bản thân về tất cả mọi điều tồi tệ xảy ra." },
    ],
  },
  {
    id: 9,
    title: "Ý nghĩ tự sát",
    options: [
      { value: 0, text: "Tôi không có ý nghĩ tự sát." },
      { value: 1, text: "Tôi có ý nghĩ tự sát nhưng không thực hiện." },
      { value: 2, text: "Tôi muốn tự sát." },
      { value: 3, text: "Nếu có cơ hội tôi sẽ tự sát." },
    ],
  },
  {
    id: 10,
    title: "Khóc lóc",
    options: [
      { value: 0, text: "Tôi không hay khóc." },
      { value: 1, text: "Tôi hay khóc hơn trước." },
      { value: 2, text: "Tôi thường hay khóc vì những điều nhỏ nhặt." },
      { value: 3, text: "Tôi thấy muốn khóc nhưng không thể khóc được." },
    ],
  },
  {
    id: 11,
    title: "Bồn chồn và căng thẳng",
    options: [
      { value: 0, text: "Tôi không bị bồn chồn và căng thẳng." },
      { value: 1, text: "Tôi cảm thấy dễ bồn chồn và căng thẳng hơn thường lệ." },
      { value: 2, text: "Tôi cảm thấy bồn chồn và căng thẳng đến mức khó có thể ngồi yên được." },
      { value: 3, text: "Tôi cảm thấy bồn chồn và kích động đến mức liên tục phải đi lại hoặc làm việc gì đó." },
    ],
  },
  {
    id: 12,
    title: "Quan tâm đến xung quanh",
    options: [
      { value: 0, text: "Tôi vẫn còn sự quan tâm đến những người xung quanh hoặc các hoạt động." },
      { value: 1, text: "Tôi ít quan tâm đến mọi người, mọi việc xung quanh hơn trước." },
      { value: 2, text: "Tôi mất hầu hết sự quan tâm đến mọi người, mọi việc xung quanh." },
      { value: 3, text: "Tôi không còn quan tâm đến bất kỳ điều gì nữa." },
    ],
  },
  {
    id: 13,
    title: "Khả năng quyết định",
    options: [
      { value: 0, text: "Tôi tự quyết định mọi việc tốt như trước." },
      { value: 1, text: "Tôi thấy khó quyết định mọi việc hơn trước." },
      { value: 2, text: "Tôi thấy khó quyết định mọi việc hơn trước rất nhiều." },
      { value: 3, text: "Tôi chẳng còn quyết định được việc gì cả." },
    ],
  },
  {
    id: 14,
    title: "Cảm giác vô dụng",
    options: [
      { value: 0, text: "Tôi không cảm thấy mình là người vô dụng." },
      { value: 1, text: "Tôi cảm thấy mình là người vô dụng hơn trước khi một chút." },
      { value: 2, text: "Tôi cảm thấy mình vô dụng hơn nhiều so với những người xung quanh." },
      { value: 3, text: "Tôi cảm thấy mình là người hoàn toàn vô dụng." },
    ],
  },
  {
    id: 15,
    title: "Sức lực",
    options: [
      { value: 0, text: "Tôi thấy mình vẫn tràn đầy sinh lực như trước đây." },
      { value: 1, text: "Sức lực của tôi kém hơn trước." },
      { value: 2, text: "Tôi không đủ sức lực để làm được nhiều việc nữa." },
      { value: 3, text: "Tôi không đủ sức lực để làm được bất cứ việc gì nữa." },
    ],
  },
  {
    id: 16,
    title: "Giấc ngủ",
    options: [
      { value: 0, text: "Không thấy có chút thay đổi gì trong giấc ngủ của tôi." },
      { value: 1, text: "Tôi ngủ hơi nhiều hơn trước." },
      { value: 1, text: "Tôi ngủ hơi ít hơn trước." },
      { value: 2, text: "Tôi ngủ nhiều hơn trước." },
      { value: 2, text: "Tôi ngủ ít hơn trước." },
      { value: 3, text: "Tôi ngủ hầu như suốt cả ngày." },
      { value: 3, text: "Tôi thức dậy 1-2 giờ sớm hơn trước và không thể ngủ lại được." },
    ],
  },
  {
    id: 17,
    title: "Cáu kỉnh và bực bội",
    options: [
      { value: 0, text: "Tôi không dễ cáu kỉnh và bực bội." },
      { value: 1, text: "Tôi dễ cáu kỉnh và bực bội hơn trước." },
      { value: 2, text: "Tôi dễ cáu kỉnh và bực bội hơn trước rất nhiều." },
      { value: 3, text: "Lúc nào tôi cũng dễ cáu kỉnh và bực bội." },
    ],
  },
  {
    id: 18,
    title: "Cảm giác ngon miệng",
    options: [
      { value: 0, text: "Tôi ăn vẫn ngon miệng như trước." },
      { value: 1, text: "Tôi ăn kém ngon miệng hơn trước." },
      { value: 1, text: "Tôi ăn ngon miệng hơn trước." },
      { value: 2, text: "Tôi ăn kém ngon miệng hơn trước rất nhiều." },
      { value: 2, text: "Tôi ăn ngon miệng hơn trước rất nhiều." },
      { value: 3, text: "Tôi không thấy ngon miệng một chút nào cả." },
      { value: 3, text: "Lúc nào tôi cũng thấy thèm ăn." },
    ],
  },
  {
    id: 19,
    title: "Tập trung chú ý",
    options: [
      { value: 0, text: "Tôi có thể tập trung chú ý tốt như trước." },
      { value: 1, text: "Tôi không thể tập trung chú ý được như trước." },
      { value: 2, text: "Tôi thấy khó tập trung chú ý lâu được vào bất kỳ điều gì." },
      { value: 3, text: "Tôi thấy mình không thể tập trung chú ý được vào bất kỳ điều gì nữa." },
    ],
  },
  {
    id: 20,
    title: "Mệt mỏi",
    options: [
      { value: 0, text: "Tôi không bị mệt mỏi." },
      { value: 1, text: "Tôi dễ mệt mỏi hơn trước." },
      { value: 2, text: "Hầu như làm bất kỳ việc gì tôi cũng thấy mệt mỏi." },
      { value: 3, text: "Tôi quá mệt mỏi khi làm bất kỳ việc gì." },
    ],
  },
  {
    id: 21,
    title: "Hứng thú tình dục",
    options: [
      { value: 0, text: "Tôi không thấy có thay đổi gì trong hứng thú tình dục." },
      { value: 1, text: "Tôi ít hứng thú với tình dục hơn trước." },
      { value: 2, text: "Hiện nay tôi rất ít hứng thú với tình dục." },
      { value: 3, text: "Tôi hoàn toàn mất hứng thú tình dục." },
    ],
  },
];
