const readFile = () => {
    return `i
me
my
myself
we
our
ours
ourselves
you
you're
you've
you'll
you'd
your
yours
yourself
yourselves
he
him
his
himself
she
she's
her
hers
herself
it
it's
its
itself
they
them
their
theirs
themselves
what
which
who
whom
this
that
that'll
these
those
am
is
are
was
were
be
been
being
have
has
had
having
do
does
did
doing
a
an
the
and
but
if
or
because
as
until
while
of
at
by
for
with
about
against
between
into
through
during
before
after
above
below
to
from
up
down
in
out
on
off
over
under
again
further
then
once
here
there
when
where
why
how
all
any
both
each
few
more
most
other
some
such
no
nor
not
only
own
same
so
than
too
very
s
t
can
will
just
don
don't
should
should've
now
d
ll
m
o
re
ve
y
ain
aren
aren't
couldn
couldn't
didn
didn't
doesn
doesn't
hadn
hadn't
hasn
hasn't
haven
haven't
isn
isn't
ma
mightn
mightn't
mustn
mustn't
needn
needn't
shan
shan't
shouldn
shouldn't
wasn
wasn't
weren
weren't
won
won't
wouldn
wouldn't
и
в
во
не
что
он
на
я
с
со
как
а
то
все
она
так
его
но
да
ты
к
у
же
вы
за
бы
по
только
ее
мне
было
вот
от
меня
еще
нет
о
из
ему
теперь
когда
даже
ну
вдруг
ли
если
уже
или
ни
быть
был
него
до
вас
нибудь
опять
уж
вам
ведь
там
потом
себя
ничего
ей
может
они
тут
где
есть
надо
ней
для
мы
тебя
их
чем
была
сам
чтоб
без
будто
чего
раз
тоже
себе
под
будет
ж
тогда
кто
этот
того
потому
этого
какой
совсем
ним
здесь
этом
один
почти
мой
тем
чтобы
нее
сейчас
были
куда
зачем
всех
никогда
можно
при
наконец
два
об
другой
хоть
после
над
больше
тот
через
эти
нас
про
всего
них
какая
много
разве
три
эту
моя
впрочем
хорошо
свою
этой
перед
иногда
лучше
чуть
том
нельзя
такой
им
более
всегда
конечно
всю
между`
}

const convertToList = (file: string) => {
    const lines = file.split("\n");
    const list = lines.map(line => line.trim());
    return list;
}

const makeStopwords = () => {
    const file = readFile();
    const list = convertToList(file);
    const stopwords = list.flat();
    return stopwords;
}

export default makeStopwords;