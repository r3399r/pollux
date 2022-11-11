CREATE VIEW v_bank AS with tmp as (
    select bank_id,
        count(question_id) as count
    from bank_question bq
        left join question on bq.question_id = question.id
    group by bank_id
)
select b.id,
    b.name,
    b.user_id,
    ifnull(tmp.count, 0) as question_count,
    b.date_created,
    b.date_updated
from bank b
    left join tmp on b.id = tmp.bank_id;